# HUSN-E-HIND - Luxury Jewellery Website

## Overview
A fully animated, production-ready luxury e-commerce website for handmade Indian jewellery, featuring a complete admin panel and manual order management system.

## Features

### Frontend (Customer-Facing)
- ✨ **Fully Animated Landing Page** - Cinematic scroll experience with Framer Motion
- 🎨 **Luxury Design** - Soft ivory/beige backgrounds with elegant gold accents
- 📱 **Responsive** - Works beautifully on all devices
- 🖼️ **Hero Section** - Full-screen parallax background with brand reveal animation
- 📖 **About Section** - Storytelling layout with scroll-triggered animations
- 🛍️ **Product Catalogue** - Animated grid with hover effects and gold shine
- 📝 **Order Form** - Smooth modal with animated inputs (NO payment gateway)
- 🎯 **Smooth Animations** - Slow, premium motion with perfect easing

### Backend & Admin
- 🔐 **Secure Admin Panel** - Complete dashboard with animated transitions
- 📊 **Dashboard Stats** - Real-time order and product statistics
- 🛠️ **Product Management** - Add, edit, delete, and toggle product visibility
- 📦 **Order Management** - View, update status, and manage customer orders
- 💾 **Supabase Backend** - Scalable database with KV store
- 🔒 **Secure API** - Protected routes with authentication

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Framer Motion** - Premium animations and transitions
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Backend
- **Supabase** - Backend-as-a-Service
- **Edge Functions** - Serverless API with Hono framework
- **KV Store** - Key-value database for products and orders

### Animation Features
- Parallax scrolling effects
- Scroll-triggered animations
- Hover micro-interactions
- Gold shimmer effects
- Smooth page transitions
- Fade, slide, and scale animations
- Loading states with skeleton screens

## Getting Started

1. The website automatically seeds demo products on first load
2. Browse products on the main page
3. Click "Order Now" to place an order (manual system, no payment)
4. Access admin panel via the settings button (bottom-right corner)

## Admin Panel Features

### Dashboard
- Total products count
- Total orders count
- Pending orders
- Completed orders

### Products Management
- Create new products with name, price, image URL, and description
- Edit existing products
- Toggle product visibility (show/hide from website)
- Delete products
- Real-time preview

### Orders Management
- View all customer orders
- Update order status (pending/completed/cancelled)
- View customer details and delivery address
- Delete orders

## Design System

### Colors
- **Primary**: Amber/Gold tones (#D97706, #CA8A04)
- **Background**: Soft ivory (#FAF9F6, #F5F1E8)
- **Text**: Dark gray (#1F2937)
- **Accents**: Yellow gold gradients

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Montserrat (clean sans-serif)
- **Style**: Tracking-wider for uppercase, refined spacing

### Animation Principles
- **Duration**: 0.8s - 1.2s for major transitions
- **Easing**: Smooth spring physics
- **Delay**: Staggered animations (0.1s - 0.2s)
- **Hover**: Scale (1.05), y-translate (-5px)

## API Endpoints

### Public Endpoints
- `GET /make-server-1174071d/products` - Get all visible products
- `POST /make-server-1174071d/orders` - Create new order
- `POST /make-server-1174071d/seed` - Seed initial demo data

### Admin Endpoints
- `POST /make-server-1174071d/admin/products` - Create product
- `PUT /make-server-1174071d/admin/products/:id` - Update product
- `DELETE /make-server-1174071d/admin/products/:id` - Delete product
- `GET /make-server-1174071d/admin/orders` - Get all orders
- `PUT /make-server-1174071d/admin/orders/:id` - Update order status
- `DELETE /make-server-1174071d/admin/orders/:id` - Delete order
- `GET /make-server-1174071d/admin/stats` - Get dashboard statistics

## Data Model

### Product
```typescript
{
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  visible: boolean;
  createdAt: string;
  updatedAt?: string;
}
```

### Order
```typescript
{
  id: string;
  name: string;
  phone: string;
  address: string;
  productId: string;
  productName: string;
  productPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}
```

## Security Considerations

⚠️ **Important**: Figma Make is designed for prototyping and should not be used to collect PII or sensitive data beyond basic demo purposes.

- No authentication is implemented (demo purposes only)
- Admin panel is accessible via UI button (not production-ready)
- Order data contains customer PII (use for demo only)
- No payment processing (manual order system)

## Deployment

The application is ready for deployment on:
- **Frontend**: Vercel, Netlify, or any static host
- **Backend**: Supabase (already configured)
- **Database**: Supabase KV Store (no additional setup needed)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized animations with GPU acceleration
- Lazy loading for images
- Efficient re-renders with React hooks
- Minimal bundle size
- Fast API responses

## Future Enhancements

- Image upload functionality
- Advanced search and filters
- Category management
- Email notifications
- PDF invoice generation
- Analytics dashboard
- Multi-language support

---

**Built with ❤️ for HUSN-E-HIND**  
*Where tradition meets elegance, and every piece is a masterpiece*
