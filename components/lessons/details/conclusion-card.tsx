import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type SectionCardProps = {
  content: string;
};
export const ConclusionCard = ({ content }: SectionCardProps) => {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="font-bold">Conclusion</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm text-muted-foreground prose prose-lg">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </CardContent>
    </Card>
  );
};
