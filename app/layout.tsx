// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Ensure this path is correct

export const metadata: Metadata = {
  title: 'Upcoming Soccer Matches',
  description: 'View upcoming soccer matches from around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}