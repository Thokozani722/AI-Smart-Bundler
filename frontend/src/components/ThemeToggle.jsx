import { Button, InlineStack, Text } from '@shopify/polaris';

const ThemeToggle = ({ colorScheme, onToggle }) => (
  <InlineStack gap="200" align="start" blockAlign="center">
    <div>
      <Text variant="bodyMd" as="p" tone="subdued">
        Color mode
      </Text>
      <Text variant="headingLg" as="p">
        {colorScheme === 'dark' ? 'Dark' : 'Light'}
      </Text>
    </div>
    <Button onClick={onToggle} variant="primary">
      Switch to {colorScheme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  </InlineStack>
);

export default ThemeToggle;
