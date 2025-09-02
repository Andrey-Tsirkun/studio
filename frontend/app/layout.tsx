import '../styles/globals.scss';
import { dmSans, audioWide } from '../utils/typography';

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
    <html lang="ru" className={`${dmSans.variable} ${audioWide.variable}`}>
      <body>{children}</body>
    </html>
  );
}
