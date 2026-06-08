import './globals.css';
import { AuthProvider } from '@/modules/auth/context/AuthContext';
import Navbar from '@/modules/shared/components/Navbar';

export const metadata = {
  title: 'DSA Sheet',
  description: 'Track your Data Structures & Algorithms progress',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
