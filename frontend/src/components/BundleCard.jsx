import { Badge, BlockStack, Button, Card, InlineStack, Text } from '@shopify/polaris';

const BundleCard = ({ bundle, onSelect }) => (
  <Card sectioned>
    <BlockStack gap="200">
      <InlineStack align="space-between" blockAlign="center">
        <Text variant="headingMd" as="h4">
          {bundle.title}
        </Text>
        <Badge tone={bundle.score > 0.7 ? 'success' : 'info'}>
          Score {bundle.score}
        </Badge>
      </InlineStack>
      <Text variant="bodyMd" tone="subdued" as="p">
        {bundle.description}
      </Text>
      <ul className="bundle-list">
        {bundle.items.map((item) => (
          <li key={item.id} className="bundle-item">
            <Text variant="bodyMd" as="p">
              {item.title} · ${item.price}
            </Text>
          </li>
        ))}
      </ul>
      <Text variant="bodySm" tone="subdued" as="p">
        {bundle.aiInsight}
      </Text>
      <InlineStack align="space-between" blockAlign="center">
        <Text variant="headingLg" as="p">
          ${bundle.total}
        </Text>
        <Button variant="secondary" onClick={() => onSelect?.(bundle)}>
          Pin to experience
        </Button>
      </InlineStack>
    </BlockStack>
  </Card>
);

export default BundleCard;
