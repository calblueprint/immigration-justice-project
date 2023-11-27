import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans as OpenSans } from 'next/font/google';
import ProfileProvider from '@/utils/ProfileProvider';

const openSans = OpenSans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Immigration Justice Project',
  description: 'Created by Blueprint',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ProfileProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ProfileProvider>
      </body>
    </html>
  );
}
