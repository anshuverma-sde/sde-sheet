import { redirect } from 'next/navigation';

// Root page — always redirect to /sheet (ProtectedPage handles auth check)
export default function Home() {
  redirect('/sheet');
}
