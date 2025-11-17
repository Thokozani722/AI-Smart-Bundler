import { BlockStack, Card, Text } from '@shopify/polaris';
import BundleCard from './BundleCard.jsx';

const ProductRecommendations = ({ product, bundles, onSelect }) => (
  <Card sectioned>
    <BlockStack gap="200">
      <Text variant="headingLg" as="h3">
        Product page integration
      </Text>
      {product ? (
        <Text as="p" tone="subdued">
          Featuring {product.title}. Customers viewing this PDP also convert with these bundles.
        </Text>
      ) : (
        <Text tone="subdued">Loading product spotlight…</Text>
      )}
      <div className="bundle-grid">
        {(bundles || []).map((bundle) => (
          <div key={bundle.id} className="bundle-card-inline">
            <BundleCard bundle={bundle} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </BlockStack>
  </Card>
);

export default ProductRecommendations;
