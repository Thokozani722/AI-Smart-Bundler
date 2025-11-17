import { BlockStack, Card, InlineGrid, ProgressBar, Text } from '@shopify/polaris';

const metricsTemplate = [
  {
    label: 'AOV Lift',
    value: '+18%',
    progress: 72,
  },
  {
    label: 'Bundle Attach Rate',
    value: '34%',
    progress: 34,
  },
  {
    label: 'Inventory Health',
    value: '92% ready',
    progress: 92,
  },
];

const DashboardMetrics = ({ bundles = [] }) => (
  <Card sectioned>
    <BlockStack gap="200">
      <Text variant="headingLg" as="h3">
        Black Friday bundle pulse
      </Text>
        <InlineGrid columns={{ xs: 1, sm: 3 }} gap="200">
        {metricsTemplate.map((metric) => (
            <div key={metric.label} className="metric-card">
              <BlockStack gap="100">
                <Text variant="bodyMd" tone="subdued" as="p">
                  {metric.label}
                </Text>
                <Text variant="heading2xl" as="p">
                  {metric.value}
                </Text>
                <ProgressBar progress={metric.progress} size="small" />
              </BlockStack>
            </div>
        ))}
      </InlineGrid>
      <Text variant="bodySm" tone="subdued">
        Highlighted bundles:{' '}
        {bundles.length
          ? bundles.map((bundle) => bundle.title).join(', ')
          : 'Fetching from AI engine...'}
      </Text>
    </BlockStack>
  </Card>
);

export default DashboardMetrics;
