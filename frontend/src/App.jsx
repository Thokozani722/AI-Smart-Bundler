import { useCallback, useEffect, useState } from 'react';
import {
  AppProvider,
  Banner,
  BlockStack,
  Button,
  Card,
  Divider,
  Frame,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  Spinner,
  Text,
} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import DashboardMetrics from './components/DashboardMetrics.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import ProductRecommendations from './components/ProductRecommendations.jsx';
import CartRecommendations from './components/CartRecommendations.jsx';
import { fetchBundles, fetchProducts } from './api/client.js';
import { mockCartItems } from './data/mockCart.js';
import './App.css';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [productResponse, bundleResponse] = await Promise.all([
        fetchProducts(),
        fetchBundles(mockCartItems),
      ]);
      setProducts(productResponse);
      setBundles(bundleResponse);
    } catch (err) {
      setError(err?.message || 'Unable to reach AI Smart Bundler backend');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const featuredProduct = products[0];

  return (
    <AppProvider i18n={enTranslations} colorScheme={colorScheme}>
      <Frame className="app-shell">
        <Page title="AI Smart Bundler" subtitle="Embedded Shopify app dashboard">
          <Layout>
            <Layout.Section>
              <div className="hero-banner">
                <div className="hero-content">
                  <BlockStack gap="300">
                    <span className="status-badge">Black Friday Ready</span>
                    <Text variant="headingXl" as="h1">
                      Recommend bundles in real time, directly inside Shopify.
                    </Text>
                    <Text variant="bodyLg" as="p">
                      Monitor top-performing bundle recipes, inject AI suggestions on product & cart
                      surfaces, and keep inventory in check.
                    </Text>
                    <InlineStack gap="200">
                      <Button variant="primary" onClick={loadData}>
                        Refresh insights
                      </Button>
                      <Button url="https://shopify.dev" target="_blank">
                        View Shopify docs
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </div>
              </div>
            </Layout.Section>

            {error && (
              <Layout.Section>
                <Banner tone="critical" title="Backend connection issue">
                  <p>{error}</p>
                </Banner>
              </Layout.Section>
            )}

              <Layout.Section>
                {loading ? (
                  <Card sectioned>
                    <div className="card-center">
                      <Spinner accessibilityLabel="Loading insights" />
                    </div>
                  </Card>
                ) : (
                  <DashboardMetrics bundles={bundles} />
                )}
              </Layout.Section>

              <Layout.Section>
                <Card sectioned>
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack>
                      <Text variant="headingMd">Theme preferences</Text>
                      <Text tone="subdued">Supports Shopify admin light & dark palettes.</Text>
                    </BlockStack>
                    <ThemeToggle
                      colorScheme={colorScheme}
                      onToggle={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                    />
                  </InlineStack>
                </Card>
              </Layout.Section>

              <Layout.Section>
                <InlineGrid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
                  <ProductRecommendations
                    product={featuredProduct}
                    bundles={bundles}
                    onSelect={(bundle) => console.log('Pin bundle', bundle.id)}
                  />
                  <CartRecommendations cartItems={mockCartItems} bundles={bundles} />
                </InlineGrid>
              </Layout.Section>

              <Layout.Section>
                <Card sectioned>
                  <BlockStack gap="200">
                    <Text variant="headingLg">Integration checklist</Text>
                    <BlockStack gap="100">
                      <InlineStack align="space-between">
                        <Text>Backend URL</Text>
                        <Text tone="subdued">{import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}</Text>
                      </InlineStack>
                      <Divider />
                      <InlineStack align="space-between">
                        <Text>Cart events</Text>
                        <Text tone="success">Streaming</Text>
                      </InlineStack>
                      <Divider />
                      <InlineStack align="space-between">
                        <Text>Inventory webhooks</Text>
                        <Text tone="subdued">Queued</Text>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </Card>
              </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AppProvider>
  );
}

export default App;
