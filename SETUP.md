# Quick Setup Guide

This guide will help you get your E-Commerce Admin Dashboard up and running quickly.

## Step 1: Install Dependencies

Choose your preferred package manager:

\`\`\`bash
# Using npm
npm install

# Using pnpm (recommended for faster installs)
pnpm install

# Using yarn
yarn install
\`\`\`

## Step 2: Configure Environment

Create a `.env` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and set your backend API URL:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

Replace `http://localhost:5000/api` with your actual backend API URL.

## Step 3: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The dashboard will be available at `http://localhost:3000`

## Step 4: Login

1. Navigate to `http://localhost:3000/login`
2. Enter your phone number (format: +966501234567)
3. Click "Send OTP"
4. Enter the OTP code sent to your phone
5. Click "Verify & Login"

## Project Structure Overview

\`\`\`
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Button, Card, etc.)
│   ├── dashboard-overview.tsx
│   ├── DashboardLayout.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React Context (Auth)
├── hooks/              # Custom hooks (useToast)
├── lib/                # Utilities (api, utils)
├── pages/              # Page components
├── services/           # API service layers
├── types/              # TypeScript types
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
\`\`\`

## Key Features

### Authentication
- OTP-based phone authentication
- JWT token management
- Protected routes
- Admin-only routes

### Dashboard Pages
- **Overview** - Statistics, charts, recent orders
- **Orders** - Full order management
- **Users** - Customer management (admin only)
- **Categories** - Product category management
- **Ads** - Advertisement management (admin only)

### API Integration
All API calls are handled through service layers in `src/services/`:
- `authService.ts` - Authentication
- `orderService.ts` - Orders
- `productService.ts` - Products
- `categoryService.ts` - Categories
- `adService.ts` - Advertisements

### Styling
- Dark theme by default
- Tailwind CSS for styling
- shadcn/ui components
- Fully responsive design

## Common Issues

### Port Already in Use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### API Connection Failed
1. Check that your backend is running
2. Verify `VITE_API_URL` in `.env` is correct
3. Check browser console for CORS errors
4. Ensure your backend has CORS enabled for `http://localhost:3000`

### Import Errors
If you see errors about `@/` imports:
1. Make sure `tsconfig.json` has the correct path mapping
2. Restart your development server
3. Clear Vite cache: `rm -rf node_modules/.vite`

## Building for Production

\`\`\`bash
# Build the project
npm run build

# Preview the production build
npm run preview
\`\`\`

The built files will be in the `dist/` directory.

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Your Server
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your server
3. Configure your web server (nginx, Apache) to serve the files
4. Set up environment variables on your server

## Next Steps

1. Customize the color scheme in `src/index.css`
2. Add your logo and branding
3. Connect to your backend API
4. Test all features
5. Deploy to production

## Support

For issues or questions:
- Check the main README.md for detailed documentation
- Review the code comments
- Check browser console for errors
- Verify API endpoints match your backend

## Tips

- Use the browser DevTools to debug API calls
- Check the Network tab for failed requests
- Use React DevTools to inspect component state
- Enable TypeScript strict mode for better type safety
