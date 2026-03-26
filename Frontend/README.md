# CivicTrack Frontend

A modern, responsive frontend for tracking and managing civic issues in your community. Built with Next.js 16, React 19, TypeScript, and shadcn/ui.

## Features

- **Dashboard**: View all reported civic issues with filtering and search capabilities
- **Create Issues**: Report new civic issues with detailed information
- **Edit Issues**: Update existing issues with new information
- **Delete Issues**: Remove resolved or duplicate issues
- **Real-time Updates**: Issues list updates automatically after actions
- **Professional Design**: Dark theme optimized for accessibility
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications**: User-friendly feedback for all operations

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19 with shadcn/ui components
- **Styling**: Tailwind CSS with custom dark theme
- **Forms**: react-hook-form + Zod for validation
- **HTTP Client**: Native Fetch API with error handling
- **Notifications**: Sonner for toast notifications

## Prerequisites

Before running the frontend, ensure you have:

- Node.js 18+ installed
- pnpm package manager
- Backend API running on `http://localhost:5000`

## Installation

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. The frontend expects the backend API to be running on `http://localhost:5000/api`. If your backend is on a different port, update `API_BASE_URL` in `lib/api.ts`.

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── dashboard-container.tsx  # Main container with state management
│   ├── issue-card.tsx           # Individual issue card component
│   ├── issue-form.tsx           # Create/edit form dialog
│   ├── issue-skeleton.tsx       # Loading skeleton components
│   ├── issues-list.tsx          # Grid of issues
│   └── delete-dialog.tsx        # Confirmation dialog
├── hooks/
│   └── use-issues.ts        # Custom hook for issue management
├── lib/
│   └── api.ts              # API client with TypeScript types
└── public/                 # Static assets
```

## API Integration

The frontend connects to a backend API that should provide the following endpoints:

### Get All Issues
```
GET /api/issues
Response: Issue[]
```

### Get Single Issue
```
GET /api/issues/:id
Response: Issue
```

### Create Issue
```
POST /api/issues
Body: CreateIssuePayload
Response: Issue
```

### Update Issue
```
PUT /api/issues/:id
Body: UpdateIssuePayload
Response: Issue
```

### Delete Issue
```
DELETE /api/issues/:id
Response: void
```

## Issue Schema

```typescript
interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}
```

## Available Categories

- Pothole
- Street Light
- Sidewalk
- Graffiti
- Trash
- Water/Drainage
- Traffic
- Other

## Available Priorities

- Low
- Medium
- High
- Critical

## Design Theme

The application uses a professional dark theme with:

- **Primary Color**: Blue (#3b82f6)
- **Background**: Deep slate (#0f172a)
- **Cards**: Darker slate (#1e293b)
- **Text**: Light gray (#e2e8f0)
- **Accent**: Vibrant blue (#2563eb)

## Build for Production

```bash
pnpm build
pnpm start
```

## Environment Variables

If needed, configure the API base URL:

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Update `lib/api.ts` to use the environment variable:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Ensure backend is running on the correct port
- Check that CORS is enabled on the backend
- Verify the API base URL in `lib/api.ts`

### Form Validation Errors
- Check that all required fields are filled
- Ensure field values meet minimum length requirements
- Review error messages in the form

### Toast Notifications Not Showing
- Verify Sonner is properly installed
- Check browser console for errors
- Ensure the Toaster component is rendered in the page

## Performance Optimization

- Images are optimized with next/image
- Components are split for better code-splitting
- Custom hook prevents unnecessary re-renders
- Tailwind CSS is purged in production

## Accessibility

- Semantic HTML elements throughout
- Proper color contrast ratios for WCAG compliance
- Keyboard navigation support
- ARIA labels for screen readers
- Form labels properly associated with inputs

## Contributing

When adding new features:

1. Create components in the `components/` directory
2. Keep components focused and single-responsibility
3. Use TypeScript for type safety
4. Follow the existing code style
5. Test on multiple screen sizes

## License

This project is part of CivicTrack and follows the main project's license.
