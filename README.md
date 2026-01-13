# Product Explorer Dashboard

A modern, responsive e-commerce product browsing application built with Next.js 14, React, and TypeScript. Browse products, filter by category, search, add favorites, and manage your shopping cart with a beautiful, accessible UI.

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd Product-Explorer-Dashboards
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## ✨ Features Implemented

### Core Functionality

- **Product Listing Page**
  - Grid layout displaying all available products
  - Responsive design (mobile, tablet, desktop)
  - Loading skeletons during data fetch
  - Error state handling with user-friendly messages

- **Product Detail Page**
  - Individual product pages with full details
  - High-quality product images
  - Product ratings and review counts
  - Full product descriptions
  - Back navigation to product listing

- **Search Functionality**
  - Real-time product search by title
  - Search bar in header and main filters section
  - Case-insensitive search matching

- **Category Filtering**
  - Filter products by category
  - Dynamic category list from API
  - "All Categories" option to show all products

- **Sorting**
  - Sort by price: Low to High
  - Sort by price: High to Low
  - Default order (as received from API)

- **Favorites/Wishlist**
  - Add/remove products to favorites
  - Favorites persisted in browser localStorage
  - Filter to show only favorited products
  - Visual indicators (heart icon) on favorited items
  - Favorites accessible across sessions

- **Shopping Cart**
  - Add products to cart from product cards
  - Cart count displayed in header
  - Cart data persisted in localStorage
  - Quantity management (increment on duplicate adds)
  - Visual feedback during add-to-cart action

### User Interface & Experience

- **Dark Mode Support**
  - System preference detection
  - Manual theme toggle
  - Smooth theme transitions
  - Persistent theme preference

- **Responsive Design**
  - Mobile-first approach
  - Breakpoints for tablet and desktop
  - Adaptive grid layouts
  - Touch-friendly interactive elements

- **Accessibility**
  - ARIA labels and roles
  - Keyboard navigation support
  - Focus indicators
  - Screen reader friendly
  - Semantic HTML structure
  - Skip to main content link

- **Performance Optimizations**
  - Next.js Image optimization
  - Client-side filtering and sorting (no unnecessary API calls)
  - Memoized filtered/sorted product lists
  - API response caching (60s for products, 1hr for categories)

- **Error Handling**
  - API timeout handling (15 seconds)
  - Graceful error messages
  - Error state components
  - Network failure handling

- **Loading States**
  - Skeleton loaders for better UX
  - Loading indicators during API calls
  - Smooth transitions between states

### Technical Features

- **TypeScript** for type safety
- **Next.js 14** App Router
- **Tailwind CSS** for styling
- **next-themes** for theme management
- **Client-side state management** with React hooks
- **localStorage** for data persistence

## 🔧 Assumptions & Trade-offs

### Data Storage

- **localStorage for Favorites & Cart**: 
  - **Assumption**: User data doesn't need to sync across devices or persist after browser data is cleared
  - **Trade-off**: Data is client-side only, no backend persistence or multi-device sync
  - **Reason**: Simplifies implementation and removes need for authentication/backend infrastructure

### API Integration

- **FakeStoreAPI Dependency**:
  - **Assumption**: External API (fakestoreapi.com) will remain available and stable
  - **Trade-off**: Application depends on third-party service availability
  - **Reason**: Provides realistic product data without building a custom backend

- **No Pagination**:
  - **Assumption**: Product catalog size is manageable for client-side rendering (~20-30 products)
  - **Trade-off**: All products loaded at once, may impact performance with very large catalogs
  - **Reason**: Simpler implementation, acceptable for demo/moderate-sized catalogs

### Filtering & Sorting

- **Client-Side Processing**:
  - **Assumption**: All products can be loaded and filtered in the browser
  - **Trade-off**: No server-side filtering, sorting, or pagination
  - **Reason**: Reduces API calls and server complexity, suitable for moderate dataset sizes

### User Authentication

- **No User Accounts**:
  - **Assumption**: Application is for browsing/demo purposes, no checkout required
  - **Trade-off**: No user-specific features, favorites/cart are device-specific
  - **Reason**: Focuses on core product exploration features without authentication complexity

### E-commerce Features

- **No Checkout Flow**:
  - **Assumption**: Application demonstrates product browsing, not full e-commerce functionality
  - **Trade-off**: Cart exists but cannot be converted to orders
  - **Reason**: Scope limited to product exploration and discovery features

### Currency & Localization

- **Hardcoded Currency (₹)**:
  - **Assumption**: Application targets Indian market or uses INR as default
  - **Trade-off**: No multi-currency support or localization
  - **Reason**: Simplifies display logic, can be extended with i18n if needed

### Image Handling

- **Unoptimized External Images**:
  - **Assumption**: External API images may not support Next.js Image optimization
  - **Trade-off**: Using `unoptimized` flag, may impact performance
  - **Reason**: Ensures compatibility with external image sources

### Error Handling

- **Graceful Degradation**:
  - **Assumption**: Categories are optional, application should work without them
  - **Trade-off**: Category filter may be empty if API fails
  - **Reason**: Core product browsing remains functional even if categories fail to load

## 📁 Project Structure

```
Product-Explorer-Dashboards/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/product listing page
│   ├── products/[id]/     # Dynamic product detail pages
│   └── layout.tsx         # Root layout with theme provider
├── components/            # React components
│   ├── layout/           # Layout components (Header)
│   ├── ui/               # UI components (filters, cards, etc.)
│   └── *.tsx             # Feature components
├── lib/                   # Utility functions
│   ├── api.ts            # API client functions
│   └── favorites.ts      # Favorites management
├── types/                 # TypeScript type definitions
└── __tests__/            # Test files
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.5.4
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.7
- **Theme**: next-themes 0.4.6
- **API**: FakeStoreAPI (https://fakestoreapi.com)

## 📝 Development Notes

- The application uses Next.js App Router with Server and Client Components
- Client-side interactivity is handled with `'use client'` directives
- API calls use Next.js `fetch` with revalidation for caching
- All user preferences (theme, favorites, cart) persist in localStorage
- The application is fully responsive and tested across common screen sizes

## 🔮 Future Enhancements

Potential improvements that could be added:

- User authentication and accounts
- Server-side filtering and pagination
- Checkout and payment integration
- Product reviews and ratings submission
- Multi-currency support
- Internationalization (i18n)
- Advanced search filters (price range, rating, etc.)
- Product comparison feature
- Recently viewed products
- Share product functionality
- Print-friendly product pages
