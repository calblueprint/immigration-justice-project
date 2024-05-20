import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import AuthProvider from '@/utils/AuthProvider';
import ProfileProvider from '@/utils/ProfileProvider';
import './globals.css';
import NavBar from '@/components/NavBar';

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
        className={sans.className}
        style={{ background: COLORS.background }}
      >
        <AuthProvider>
          <ProfileProvider>
            <StyledComponentsRegistry>
              <NavBar />
              {children}
            </StyledComponentsRegistry>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
