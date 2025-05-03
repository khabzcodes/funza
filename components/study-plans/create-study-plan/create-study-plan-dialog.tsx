import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CreateLessonPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateLessonPlanDialog = ({ open, onOpenChange }: CreateLessonPlanDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[900px] max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create Lesson Plan</DialogTitle>
          <DialogDescription>
            Create a new lesson plan by filling out the form below. You can add details such as the
            title, description, and objectives of the lesson.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
