# E-Commerce Admin Dashboard

A modern, full-featured admin dashboard for e-commerce platforms built with React, Vite, TypeScript, and shadcn/ui.

## Features

- 🔐 **Authentication** - OTP-based phone authentication
- 📊 **Dashboard Overview** - Sales statistics, charts, and analytics
- 📦 **Order Management** - Track and manage customer orders
- 👥 **User Management** - Manage customers and their membership levels
- 🏷️ **Category Management** - Organize products into categories
- 📢 **Advertisement Management** - Create and manage promotional ads
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 🌙 **Dark Theme** - Professional dark mode design
- 📱 **Responsive** - Works on all device sizes

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Backend API running (see API Configuration below)

### Installation

1. Clone the repository or download the project

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
\`\`\`

3. Create a `.env` file in the root directory:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open your browser and navigate to `http://localhost:3000`

## API Configuration

The dashboard connects to your Express backend API. Make sure your backend is running and accessible at the URL specified in `.env`.

### Required API Endpoints

The dashboard expects the following API endpoints:

#### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and login
- `POST /auth/resend-otp` - Resend OTP
- `GET /auth/profile` - Get user profile (protected)
- `PUT /auth/profile` - Update user profile (protected)

#### Orders
- `GET /orders` - Get user orders (protected)
- `GET /orders/:orderId` - Get order by ID (protected)
- `POST /orders` - Create new order (protected)
- `PUT /admin/orders/:orderId/status` - Update order status (admin only)

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products/featured` - Get featured products
- `GET /products/category/:categoryId` - Get products by category

#### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin only)
- `PUT /categories/:id` - Update category (admin only)
- `DELETE /categories/:id` - Delete category (admin only)

#### Ads
- `GET /ads` - Get all ads
- `GET /ads/:id` - Get ad by ID
- `POST /ads` - Create ad (admin only)
- `PUT /ads/:id` - Update ad (admin only)
- `DELETE /ads/:id` - Delete ad (admin only)

## Project Structure

\`\`\`
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard-overview.tsx
│   │   ├── stats-cards.tsx
│   │   ├── sales-chart.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom hooks
│   │   └── use-toast.ts
│   ├── lib/                # Utilities
│   │   ├── api.ts         # Axios instance
│   │   └── utils.ts       # Helper functions
│   ├── pages/              # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── OrdersPage.tsx
│   │   └── ...
│   ├── services/           # API service layers
│   │   ├── authService.ts
│   │   ├── orderService.ts
│   │   └── ...
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

1. User enters phone number on login page
2. OTP is sent to the phone number
3. User enters OTP to verify
4. JWT token is stored in localStorage
5. Protected routes check for valid token
6. Token is sent with all API requests via Authorization header

## Environment Variables

- `VITE_API_URL` - Backend API base URL (required)

## Customization

### Changing Colors

Edit `src/index.css` to customize the color scheme:

\`\`\`css
:root {
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... other colors */
}
\`\`\`

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add navigation link in `src/components/DashboardLayout.tsx`

### Adding New API Services

1. Create a new service file in `src/services/`
2. Import and use the `api` instance from `src/lib/api.ts`
3. Add TypeScript types in `src/types/index.ts`

## Troubleshooting

### CORS Issues

If you encounter CORS errors, make sure your backend API has CORS enabled:

\`\`\`javascript
// Express backend
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
\`\`\`

### API Connection Issues

1. Check that `VITE_API_URL` in `.env` is correct
2. Verify your backend is running
3. Check browser console for error messages
4. Verify API endpoints match the expected format

### Build Issues

If you encounter build errors:

1. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check TypeScript errors: `npm run build`

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
\`\`\`

```env file="" isHidden
