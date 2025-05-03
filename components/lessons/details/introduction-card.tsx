import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type IntroductionCardProps = {
  title: string;
  description: string;
};

export const IntroductionCard = ({ title, description }: IntroductionCardProps) => {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
};
