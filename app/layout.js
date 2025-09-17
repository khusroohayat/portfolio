import Head from 'next/head';
import './globals.css';
import Header from './Header';

export const metadata = {
  title: 'Top-Rated Full Stack Web Developer | Custom Web Solutions & Professional Services',
  description:
    'Expert full stack web developer offering custom web solutions. Build scalable apps with React, Node.js, and more. Competitive rates, fast turnaround. Let’s create your next project!',
  icons: {
    icon: '/imgs/favicon.jpg',
  },
  verification: {
    google: 'dx-iQzb3wfDa9BKsU1_E1GglJ5opHeo3gPpb-cmroQw',
  },
  alternates: {
    canonical: 'https://khusroohayat-portfolio.netlify.app/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="dx-iQzb3wfDa9BKsU1_E1GglJ5opHeo3gPpb-cmroQw"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="styles.css" />
        <link rel="icon" type="image/jpeg" href="./imgs/favicon.jpg" />
        <link rel="canonical" href="https://khusroohayat-portfolio.netlify.app/" />
      </Head>
      <body>
        {/* Global Header/Nav for all pages */}
        <Header />
        {children}
      </body>
    </html>
  );
}
