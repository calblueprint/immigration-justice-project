import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';
import type { Metadata } from 'next';
import { openSans } from '@/styles/fonts';
import ProfileProvider from '@/utils/ProfileProvider';
import COLORS from '@/styles/colors';

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
      <body
        className={openSans.className}
        style={{ background: COLORS.background }}
      >
        <ProfileProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ProfileProvider>
      </body>
    </html>
  );
}
