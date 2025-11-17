import { BlockStack, Card, Divider, InlineStack, Tag, Text } from '@shopify/polaris';

const CartRecommendations = ({ cartItems, bundles }) => (
  <Card sectioned>
    <BlockStack gap="200">
      <Text variant="headingLg" as="h3">
        Cart experience
      </Text>
      <Text tone="subdued">Cart snapshot</Text>
      <InlineStack gap="200" wrap>
        {cartItems.map((item) => (
          <Tag key={item.productId}>
            {item.productId} × {item.quantity}
          </Tag>
        ))}
      </InlineStack>
      <Divider />
      <Text variant="headingMd" as="h4">
        Real-time bundle injections
      </Text>
      {(bundles || []).map((bundle) => (
        <BlockStack key={bundle.id} gap="100">
          <Text variant="bodyLg" as="p">
            {bundle.title}
          </Text>
          <Text tone="subdued" as="p">
            {bundle.savingsSuggestion}
          </Text>
          <Text variant="bodySm" tone="subdued" as="p">
            {bundle.aiInsight}
          </Text>
        </BlockStack>
      ))}
    </BlockStack>
  </Card>
);

export default CartRecommendations;
