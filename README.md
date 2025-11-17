# News Today

A modern, responsive news aggregation web application built with React and TypeScript that delivers real-time news from multiple sources with a focus on performance and user experience.

## Tech Stack & Architectural Decisions

### Core Framework

- **React 19 + TypeScript**: Chose React 19 for the latest features like concurrent rendering and automatic batching, while TypeScript provides compile-time safety and better developer experience
- **Vite 7**: Selected over Create React App for significantly faster hot module replacement (HMR) and modern ES modules support

### State Management

- **TanStack React Store**: Lightweight alternative to Redux/Zustand for managing global state (active tab, search queries) - chosen for simplicity since we only need minimal global state

### Styling & UI

- **Tailwind CSS 4**: Utility-first approach enables rapid prototyping and maintains design consistency without custom CSS bloat
- **Framer Motion**: Provides smooth, performant animations for enhanced UX without the complexity of GSAP
- **Lucide React**: Consistent icon system with tree-shaking support

### Data & API Integration

- **NewsData.io API**: Selected over NewsAPI for better free tier limits and more reliable uptime
- **Axios**: Robust HTTP client with better error handling and request/response interceptors than fetch
- **Custom Hooks Pattern**: `useNews` hook abstracts data fetching logic from components for reusability and testability

## Key Implementation Decisions

### Component Architecture

```
src/
├── components/
│   ├── news-feeds/     # Domain-specific components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom hooks for logic separation
├── lib/                # API integration layer
└── types/              # TypeScript definitions
```

**Why this structure?**

- Separates business logic (news-feeds) from generic UI components
- Makes components more testable and reusable
- Clear separation of concerns between data fetching, UI, and business logic

### Performance Optimizations

- **Debounced Search**: Prevents excessive API calls during user typing
- **Loading States**: Skeleton components provide immediate visual feedback
- **Error Boundaries**: Graceful error handling prevents app crashes
- **Type Safety**: Comprehensive TypeScript interfaces reduce runtime errors

### Security & Best Practices

- **Environment Variables**: API keys stored securely in `.env` files
- **Header-based Auth**: API keys sent in headers instead of URL parameters
- **Input Sanitization**: All user inputs are sanitized before API requests

### SEO & Social Sharing

- **Open Graph Meta Tags**: Proper social media sharing with custom OG images
- **Twitter Cards**: Enhanced Twitter sharing experience
- **Semantic HTML**: Proper heading hierarchy and accessibility

## Features

- 📰 Real-time news aggregation from NewsData.io
- 🔍 Debounced search with instant results
- 📱 Responsive design with mobile-first approach
- 🎯 Category-based filtering (Business, Technology, World, etc.)
- 🔗 Individual article pages with related content
- ⚡ Fast loading with skeleton states
- 🎨 Smooth animations and micro-interactions
- 🔒 Secure API key management

TODO: 1 . add setup. 2. to add link.
