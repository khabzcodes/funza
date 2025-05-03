import { Icons } from '@/components/icons';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';

export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Lessons" description="Manage your lessons.">
        <Button>
          <Icons.squarePlus />
          Create Lesson
        </Button>
      </PageHeader>
    </div>
  );
}
