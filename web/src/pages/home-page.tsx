import { DocsDetail } from '@/components/docs/docs-detail';
import DocsSidebar from '@/components/docs/docs-sidebar';

export default function HomePage() {
  return (
    <div className="flex h-full w-full">
      <div className="h-full min-h-screen w-64 border-r border-solid border-gray-300/70 py-4">
        <DocsSidebar />
      </div>
      <div className="h-full w-[calc(100%-16rem)] p-4">
        <DocsDetail />
      </div>
    </div>
  );
}
