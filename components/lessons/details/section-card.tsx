import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type SectionCardProps = {
  title: string;
  content: string;
};

export const SectionCard = ({ title, content }: SectionCardProps) => {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm text-muted-foreground prose prose-lg">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </CardContent>
    </Card>
  );
};
