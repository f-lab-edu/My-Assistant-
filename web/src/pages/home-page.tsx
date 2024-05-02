import DocsSidebar from '@/components/docs/docs-sidebar';

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="h-full w-64 border-r border-solid border-gray-300/70 py-4">
        <DocsSidebar />
      </div>
    </div>
  );
}
