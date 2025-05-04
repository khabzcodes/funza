import { useMutation } from '@tanstack/react-query';
import { Icons } from '../icons';
import { Badge } from '../ui/badge';
import { startAssessment } from '@/rpc/submissions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AssessmentCardProps = {
  id: string | undefined;
  lessonId: string;
  topic: string;
  subject: string;
  isSubmitted: boolean;
};

export const AssessmentCard = ({
  topic,
  lessonId,
  id,
  subject,
  isSubmitted,
}: AssessmentCardProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => startAssessment(lessonId),
    onSuccess: response => {
      router.push(`/dashboard/assessments/${response.id}`);
    },
    onError: error => {
      toast.error('Error starting assessment: ' + error.message);
    },
  });

  const handleOnClick = async () => {
    if (id) {
      router.push(`/dashboard/assessments/${id}`);
    } else {
      await mutation.mutateAsync();
    }
  };

  return (
    <div
      className="flex flex-col p-4 border rounded-md hover:bg-muted transition-colors duration-200 ease-in-out"
      onClick={() => handleOnClick()}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icons.book className="size-4" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold capitalize">{subject}</h3>
          <p className="text-xs text-muted-foreground">{topic}</p>
        </div>
      </div>
      <div className="ml-auto">
        {isSubmitted ? (
          <Badge>Completed</Badge>
        ) : (
          <Badge variant="destructive">Not Submitted</Badge>
        )}
      </div>
    </div>
  );
};
