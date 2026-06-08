import RegisterForm from '@/modules/auth/components/RegisterForm';

export const metadata = { title: 'Register — DSA Sheet' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <RegisterForm />
    </div>
  );
}
