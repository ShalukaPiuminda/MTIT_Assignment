import { createProxyMiddleware } from 'http-proxy-middleware';

export function setupProxies(app: any) {
  console.log('Setting up proxy routes...');

  app.use(
    '/products',
    createProxyMiddleware({
      target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {},
    }),
  );

  app.use(
    '/customers',
    createProxyMiddleware({
      target: process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5002',
      changeOrigin: true,
      pathRewrite: {},
    }),
  );

  app.use(
    '/orders',
    createProxyMiddleware({
      target: process.env.ORDER_SERVICE_URL || 'http://localhost:5004',
      changeOrigin: true,
      pathRewrite: {},
    }),
  );

  app.use(
    '/inventory',
    createProxyMiddleware({
      target: process.env.INVENTORY_SERVICE_URL || 'http://localhost:5003',
      changeOrigin: true,
      pathRewrite: {},
    }),
  );

  console.log('Proxy routes configured:');
  console.log(`  /products  → ${process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001'}`);
  console.log(`  /customers → ${process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5002'}`);
  console.log(`  /orders    → ${process.env.ORDER_SERVICE_URL || 'http://localhost:5004'}`);
  console.log(`  /inventory → ${process.env.INVENTORY_SERVICE_URL || 'http://localhost:5003'}`);
}