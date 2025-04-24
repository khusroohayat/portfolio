import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-pro-latest'; // This is the standard alias
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

export async function GET(req, res) {
    const messages = [
        // { role: 'system', content: 'you are a helpful assistant' },
        { role: 'user', content: 'Why is Javascript better than Python?' },
    ];
    const geminiMessages = messages.map(m => ({
        author: m.role,
        content: m.content
    }));
    const body = {
        contents: [
            { parts: geminiMessages.map(m => ({ text: m.content })) }
        ]
    };
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    return NextResponse.json({ message });
}

export async function POST(req) {
    try {
        const { messages: clientMessages } = await req.json(); // Rename to avoid confusion

        // --- Refined Message Processing ---
        let systemInstructionContent = null;
        const conversationHistory = [];

        // Find system message
        const systemMessageIndex = clientMessages.findIndex(m => m.role === 'system');
        if (systemMessageIndex !== -1) {
            systemInstructionContent = clientMessages[systemMessageIndex].content;
            // Remove system message from the main conversation history for the 'contents' field
            clientMessages.splice(systemMessageIndex, 1);
        } else {
             // Add a default system prompt if none provided by client? Optional.
             systemInstructionContent = `You are PortfolioGPT, answering only questions based on the resume provided.\nResume:\n${DATA_RESUME}\n\nHelp users learn more about Adrian from his resume.`;
        }
        console.log("systemInstructionContent", systemInstructionContent);
        

        clientMessages.forEach(m => {
             // Skip empty messages if any
            if (!m.content) return;

            // Map client role ('assistant') to API role ('model')
            const role = m.role === 'assistant' ? 'model' : 'user'; // 'system' role handled separately

            conversationHistory.push({
                role: role,
                parts: [{ text: m.content }]
            });
        });

        // --- Construct the API Body ---
        const body = {
            contents: conversationHistory,
            // Add generationConfig and safetySettings if needed
            // generationConfig: {
            //   temperature: 0.9,
            //   topK: 1,
            //   topP: 1,
            //   maxOutputTokens: 2048,
            // },
            // safetySettings: [
            //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            //   // ... other settings
            // ],
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
            body: JSON.stringify(body)
        });

        // ... (rest of your error handling and response processing)
        // ... make sure to handle potential errors within the response `data` itself too
        const data = await response.json();

        if (!response.ok) {
            console.error('API Error Response:', data);
            const errorMessage = data?.error?.message || 'Error from Gemini API';
            return NextResponse.json({ message: errorMessage, error: data?.error }, { status: response.status });
        }

         if (data.promptFeedback) {
           // Handle content filtering or other feedback issues
           console.warn('API Prompt Feedback:', data.promptFeedback);
            if (data.promptFeedback.blockReason) {
                 return NextResponse.json({ message: `Request blocked due to: ${data.promptFeedback.blockReason}` }, { status: 400 });
            }
        }

        const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!message) {
            console.error('Unexpected API response structure or empty message:', data);
             // Check if it was blocked via candidate feedback
             const finishReason = data.candidates?.[0]?.finishReason;
             if (finishReason && finishReason !== 'STOP') {
                 return NextResponse.json({ message: `API request failed: ${finishReason}` }, { status: 500 });
             }
            return NextResponse.json({ message: 'No response text received from API' }, { status: 500 });
        }


        return NextResponse.json({ message });

    } catch (error) {
        console.error('Error in POST route:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}

const DATA_RESUME = `Adrian Twarog
Address: 1 Suburb, Street, State, 6000, Australia
Phone: +610000000
Email: not-real@adriantwarog.com
Education
Title of Course [2020-2021]
Name of Training 
Title of Academy
Microsoft Certified Web Professional  [2019 – 2018]
Graphics Designer and Web Administrator
Australian Example of Programming Business
High School Course [2018 – 2016]
Title of the Course or Majors 
Name of the High School
Skills and Competences
Full Stack Website Developer 
Front End:  HTML, CSS, JavaScript, SASS, SCSS, LESS, SEO React, Angular, Knockout, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3 
Back End:  NodeJS, PHP MySQL, MongoDB, SQL, noSQL Apache, Express, IIS, Webhooks 
Platforms: Amazon AWS, Linux, Windows, Cloud, Automation, Custom 
Frameworks: WordPress, Joomla, PrestaShop, Shopify, Stripe, PayPal, Github 
Management: Google Analytics, Adwords, Facebook Ads, Web Masters, etc 
Full Stack App Developer 
Platforms:  iOS Development, Android Development, OS Development 
Front End:  React Native, JavaScript 
Back End:  Integrated platforms, IE, Custom, WordPress, Drupal, etc 
UX and UI Designer 
Platforms:  Adobe Photoshop, Sketch, Figma 
UI:  Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
UX:  Wireframing, Workflow Diagrams, Technical Specifications  
Employment History
Web Developer [Apr 2010 – Jul 2011] 
Moshi Moshi Marketing
 Did some web dev and also IT. Provide on-site and remote technical support to 100+ clients ranging from large corporate bodies to private home users. 
 Provide over the phone support for clients to address software, hardware and network issues and assist clients through using remote software.
 Troubleshooting and resolving level 2 and 3 technical problems.
 Conduct VMware ESX installation, configuration and management. 
 Conduct communications cabinet installation, including fibre optic and cat6 patching, UPS, wireless switches and servers.
 Conduct server installation and software deployment.
 Assist with large scale SOE machine deployment. 

Additional Skills and Interests
Language: Fluent in Polish
Hobbies: Badminton, Graphics Design, Snowboarding
Online: Youtube`;

