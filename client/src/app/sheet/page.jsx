import ProtectedPage from '@/modules/shared/components/ProtectedPage';
import SheetPage from '@/modules/sheet/pages/SheetPage';

export const metadata = { title: 'DSA Sheet' };

export default function Sheet() {
  return (
    <ProtectedPage>
      <SheetPage />
    </ProtectedPage>
  );
}
