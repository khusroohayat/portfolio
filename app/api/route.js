import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-flash-latest'; //'gemini-1.5-pro-latest'; // This is the standard alias
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

export async function GET(req, res) {
  const messages = [
    // { role: 'system', content: 'you are a helpful assistant' },
    { role: 'user', content: 'Why is Javascript better than Python?' },
  ];
  const geminiMessages = messages.map((m) => ({
    author: m.role,
    content: m.content,
  }));
  const body = {
    contents: [{ parts: geminiMessages.map((m) => ({ text: m.content })) }],
  };
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  const message = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  return NextResponse.json({ message });
}

// Simple in-memory rate limiter (per IP)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map();

function getClientIp(req) {
  // Next.js edge/serverless: try x-forwarded-for, fallback to remote address
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.ip || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { count: 1, start: now };
    rateLimitMap.set(ip, entry);
    return false;
  }
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    entry.count = 1;
    entry.start = now;
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) return true;
  return false;
}

export async function POST(req) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Input validation
    let jsonBody;
    try {
      jsonBody = await req.json();
    } catch (e) {
      return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }
    const clientMessages = jsonBody?.messages;
    if (!Array.isArray(clientMessages) || clientMessages.length === 0) {
      return NextResponse.json({ message: 'Missing or invalid messages array.' }, { status: 400 });
    }
    for (const m of clientMessages) {
      if (
        !m ||
        typeof m !== 'object' ||
        typeof m.content !== 'string' ||
        !m.content.trim() ||
        typeof m.role !== 'string'
      ) {
        return NextResponse.json(
          { message: 'Each message must be an object with non-empty string content and role.' },
          { status: 400 }
        );
      }
    }

    // --- Refined Message Processing ---
    const systemInstructionContent = `You are PortfolioGPT. Your **sole purpose** is to answer questions based **strictly and only** on the resume text provided below. Do **not** use any external knowledge or information beyond this resume. If the answer cannot be found in the resume, say "That information is not available in the provided resume."\n\n--- RESUME START ---\n${DATA_RESUME}\n--- RESUME END ---`;

    const conversationHistory = [];
    clientMessages.forEach((m, index) => {
      if (!m.content) return;

      const role = m.role === 'assistant' ? 'model' : 'user';
      let messageText = m.content;

      // Prepend system instruction *only* to the LAST user message in the batch
      if (role === 'user' && index === clientMessages.length - 1) {
        // Construct the final user turn with instructions, resume, and question
        messageText = `${systemInstructionContent}\n\nUser Question: ${m.content}`;
      }

      conversationHistory.push({
        role: role,
        parts: [{ text: messageText }],
      });
    });
    // --- End Refined Message Processing ---

    const body = {
      contents: conversationHistory,
      generationConfig: {
        // Consider lowering temperature for stricter adherence
        temperature: 0.3, // Experiment with values like 0.2-0.5
      },
      safetySettings: [
        // Add standard safety settings
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    // Add system instruction if the model/API supports it (check Gemini API docs)
    // Note: The basic generateContent might not have a dedicated systemInstruction field.
    // Often, you prepend the system instructions to the *first* user message.
    // Let's try prepending if a system instruction exists:
    if (systemInstructionContent && body.contents.length > 0 && body.contents[0].role === 'user') {
      body.contents[0].parts[0].text = `${systemInstructionContent}\n\n${body.contents[0].parts[0].text}`;
    } else if (systemInstructionContent && body.contents.length === 0) {
      // If the only message is the system prompt, send it as the first user message
      body.contents.push({ role: 'user', parts: [{ text: systemInstructionContent }] });
    }
    // --- End Refined Message Processing ---

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ message: 'API key is not configured' }, { status: 500 });
    }

    console.log('Sending to API:', JSON.stringify(body, null, 2)); // Log the request body

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // ... (rest of your error handling and response processing)
    // ... make sure to handle potential errors within the response `data` itself too
    const data = await response.json();

    if (!response.ok) {
      console.error('API Error Response:', data);
      const errorMessage = data?.error?.message || 'Error from Gemini API';
      return NextResponse.json(
        { message: errorMessage, error: data?.error },
        { status: response.status }
      );
    }

    if (data.promptFeedback) {
      // Handle content filtering or other feedback issues
      console.warn('API Prompt Feedback:', data.promptFeedback);
      if (data.promptFeedback.blockReason) {
        return NextResponse.json(
          { message: `Request blocked due to: ${data.promptFeedback.blockReason}` },
          { status: 400 }
        );
      }
    }

    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      console.error('Unexpected API response structure or empty message:', data);
      // Check if it was blocked via candidate feedback
      const finishReason = data.candidates?.[0]?.finishReason;
      if (finishReason && finishReason !== 'STOP') {
        return NextResponse.json(
          { message: `API request failed: ${finishReason}` },
          { status: 500 }
        );
      }
      return NextResponse.json({ message: 'No response text received from API' }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error in POST route:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}

const DATA_RESUME = `Syed Khusroo Hayat
Address: Bungalow No. 136, Unit 6, Latifabad, Hyderabad, Pakistan
Phone: +92-332-3279737
Email: khusroo.hayat@gmail.com
LinkedIn: https://www.linkedin.com/in/khusroosyed
GitHub: https://github.com/khusroohayat

Education
Bachelor of Science in Computer Engineering [2008 – 2012]
Sir Syed University of Engineering and Technology
Karachi, Pakistan

Certifications
Microsoft Certified: Azure Fundamentals [2022]
Microsoft Azure Training Program
Microsoft
Microsoft Specialist: Programming in HTML5 with JavaScript and CSS3 (70-480) [2020]
Microsoft Certification Program
Microsoft

Skills and Competences
Full Stack Website Developer
Front End: HTML, CSS, JavaScript, TypeScript, Angular, Vue.js, React (Next.js), Blazor, Bootstrap, Razor Pages
Back End: ASP.NET Core (MVC, Web API), Node.js, PHP, RESTful APIs
Databases: Microsoft SQL Server, MongoDB, MySQL
Platforms & Tools: Microsoft Azure, Azure DevOps, Git, IIS, WordPress, WooCommerce, Docker, OpenAI Integrations
Frameworks & Libraries: Xamarin, Entity Framework, WordPress, Microsoft Dynamics CRM
Project Management: Agile, SCRUM, Remote Collaboration

Employment History
Full Stack Developer [Feb 2017 – Present]
Remote (Clients in US, UAE, Pakistan)
 Designed and developed mission-critical applications using Angular, ASP.NET Core, and SQL Server.
 Built a dog hotel booking platform using React (Next.js App Router) and Node.js.
 Developed HR and project management systems with complex API integrations.
 Created mobile and web applications using Xamarin and Azure.
 Delivered eCommerce and CMS websites using WordPress and WooCommerce.

Software Developer [Feb 2015 – Jan 2017]
10Pearls, Karachi
 Developed APIs for internal tools and external applications using .NET.
 Maintained and enhanced Microsoft Dynamics CRM for a healthcare project.
 Built a microservice-based ETL pipeline with SQL Server and Docker.
 Created browser-based testing automation framework using Node.js.

Software Engineer [Dec 2013 – Nov 2014]
Shiner Soft, Karachi
 Developed a web portal for patient-provider interaction using ASP.NET MVC.
 Created a Xamarin-based Android app from scratch.
 Handled client communication and requirement gathering.

Trainee Software Engineer [Nov 2012 – Dec 2013]
Naveena Group, Karachi
 Built procurement and production modules for an ERP system using .NET and SQL Server.
 Visited factory sites to model complex manufacturing workflows in software.

Additional Skills and Interests
Languages: Fluent in English and Urdu
Hobbies: Software prototyping, UI/UX design, tech tutorials, web innovation
Online: Personal GitHub, LinkedIn, freelance consulting
`;
