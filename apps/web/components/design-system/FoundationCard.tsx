import { Card, Heading, Text } from "@/components/primitives";

type FoundationCardProps = {
  title: string;
  body: string;
};

export function FoundationCard({ title, body }: FoundationCardProps) {
  return (
    <Card className="rounded-lg">
      <Heading level={4}>{title}</Heading>
      <Text tone="muted" className="mt-sm">
        {body}
      </Text>
    </Card>
  );
}
