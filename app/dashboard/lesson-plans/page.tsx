import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {Icons} from "@/components/icons";

export default function LessonPlans() {
  return (
    <div>
      <PageHeader title="Lesson Plans" description="Create and manage lesson plans">
        <Button size="sm">
          <Icons.squarePlus />
          Create lesson plan
        </Button>
      </PageHeader>
    </div>
  );
}
