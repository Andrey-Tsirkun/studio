import '../styles/globals.css';

export const metadata = {
  title: 'Next.js + Strapi Blog',
  description: 'A modern blog built with Next.js and Strapi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
