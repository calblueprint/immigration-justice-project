import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import AuthProvider from '@/utils/AuthProvider';
import ProfileProvider from '@/utils/ProfileProvider';
import type { Metadata } from 'next';

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
        <AuthProvider>
          <ProfileProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
