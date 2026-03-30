import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup proxy routes
app.use(
  '/products',
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: (path) => `/products${path}`,
  }),
);

app.use(
  '/customers',
  createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: (path) => `/customers${path}`,
  }),
);

app.use(
  '/orders',
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL || 'http://localhost:5004',
    changeOrigin: true,
    pathRewrite: (path) => `/orders${path}`,
  }),
);

app.use(
  '/inventory',
  createProxyMiddleware({
    target: process.env.INVENTORY_SERVICE_URL || 'http://localhost:5003',
    changeOrigin: true,
    pathRewrite: (path) => `/inventory${path}`,
  }),
);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.path} not found. Available routes: /products, /customers, /orders, /inventory`,
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ API Gateway running on http://localhost:${PORT}`);
  console.log('\nAvailable routes:');
  console.log(`  GET/POST http://localhost:${PORT}/products   → Product Service (5001)`);
  console.log(`  GET/POST http://localhost:${PORT}/customers  → Customer Service (5002)`);
  console.log(`  GET/POST http://localhost:${PORT}/orders     → Order Service (5004)`);
  console.log(`  GET/POST http://localhost:${PORT}/inventory  → Inventory Service (5003)`);
  console.log('\nTest: curl http://localhost:3000/products\n');
});