import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce Microservices API Gateway',
      description:
        'API Gateway that proxies requests to microservices (Product, Customer, Order, Inventory). Each service has its own Swagger UI at /api on their respective ports.',
      version: '1.0.0',
      contact: {
        name: 'API Gateway',
        url: 'http://localhost:3000',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server (API Gateway)',
      },
      {
        url: 'http://localhost:5001',
        description: 'Product Service (direct)',
        variables: { service: { default: 'products' } },
      },
      {
        url: 'http://localhost:5002',
        description: 'Customer Service (direct)',
        variables: { service: { default: 'customers' } },
      },
      {
        url: 'http://localhost:5003',
        description: 'Inventory Service (direct)',
        variables: { service: { default: 'inventory' } },
      },
      {
        url: 'http://localhost:5004',
        description: 'Order Service (direct)',
        variables: { service: { default: 'orders' } },
      },
    ],
    paths: {
      '/products': {
        get: {
          summary: 'Get all products',
          description:
            'Retrieves a list of all products from Product Service (5001)',
          tags: ['Products'],
          responses: {
            '200': { description: 'List of products' },
          },
        },
        post: {
          summary: 'Create a product',
          description: 'Creates a new product in Product Service (5001)',
          tags: ['Products'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'price', 'description'],
                  properties: {
                    name: { type: 'string', example: 'Wireless Mouse' },
                    price: { type: 'number', example: 49.99 },
                    description: { type: 'string', example: 'Ergonomic mouse' },
                    category: { type: 'string' },
                    sku: { type: 'string' },
                    brand: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    imageUrls: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Product created' },
          },
        },
      },
      '/customers': {
        get: {
          summary: 'Get all customers',
          description:
            'Retrieves a list of all customers from Customer Service (5002)',
          tags: ['Customers'],
          responses: {
            '200': { description: 'List of customers' },
          },
        },
        post: {
          summary: 'Create a customer',
          description: 'Creates a new customer in Customer Service (5002)',
          tags: ['Customers'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'phone'],
                  properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john@example.com' },
                    phone: { type: 'string', example: '+14155552671' },
                    address: { type: 'string' },
                    city: { type: 'string' },
                    country: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Customer created' },
          },
        },
      },
      '/orders': {
        get: {
          summary: 'Get all orders',
          description:
            'Retrieves a list of all orders from Order Service (5004)',
          tags: ['Orders'],
          responses: {
            '200': { description: 'List of orders' },
          },
        },
        post: {
          summary: 'Create an order',
          description: 'Creates a new order in Order Service (5004)',
          tags: ['Orders'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['customerId', 'productId', 'quantity'],
                  properties: {
                    customerId: { type: 'string' },
                    productId: { type: 'string' },
                    quantity: { type: 'integer', example: 2 },
                    status: {
                      type: 'string',
                      enum: [
                        'pending',
                        'confirmed',
                        'shipped',
                        'delivered',
                        'cancelled',
                      ],
                    },
                    shippingAddress: { type: 'string' },
                    paymentMethod: {
                      type: 'string',
                      enum: [
                        'card',
                        'cash_on_delivery',
                        'bank_transfer',
                        'wallet',
                      ],
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Order created' },
          },
        },
      },
      '/inventory': {
        get: {
          summary: 'Get all inventory records',
          description:
            'Retrieves all inventory records from Inventory Service (5003)',
          tags: ['Inventory'],
          responses: {
            '200': { description: 'List of inventory records' },
          },
        },
        post: {
          summary: 'Create an inventory record',
          description:
            'Creates a new inventory record in Inventory Service (5003)',
          tags: ['Inventory'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['productId', 'quantity', 'warehouseLocation'],
                  properties: {
                    productId: { type: 'string' },
                    quantity: { type: 'integer', example: 100 },
                    warehouseLocation: {
                      type: 'string',
                      example: 'Warehouse-A',
                    },
                    reservedQuantity: { type: 'integer' },
                    reorderLevel: { type: 'integer' },
                    supplierName: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Inventory record created' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Add Swagger UI route
app.use(
  '/api',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: '/api-json',
    },
  }),
);

// Serve Swagger JSON
app.get('/api-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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
    message: `Route ${req.path} not found. Available routes: /products, /customers, /orders, /inventory. Docs: /api`,
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ API Gateway running on http://localhost:${PORT}`);
  console.log('\nAvailable routes:');
  console.log(
    `  GET/POST http://localhost:${PORT}/products   → Product Service (5001)`,
  );
  console.log(
    `  GET/POST http://localhost:${PORT}/customers  → Customer Service (5002)`,
  );
  console.log(
    `  GET/POST http://localhost:${PORT}/orders     → Order Service (5004)`,
  );
  console.log(
    `  GET/POST http://localhost:${PORT}/inventory  → Inventory Service (5003)`,
  );
  console.log('\n📚 Swagger Documentation:');
  console.log(`  http://localhost:${PORT}/api`);
  console.log('\nTest: curl http://localhost:3000/products\n');
});
