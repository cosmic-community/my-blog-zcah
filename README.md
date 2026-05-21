# My Blog

![App Preview](https://imgix.cosmicjs.com/c706e720-54dd-11f1-8825-07d30234df00-autopilot-photo-1528127269322-539801943592-1779344692871.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern blog application built with Next.js 16 and Cosmic CMS.

## Features

- 📝 Posts with rich content, featured images, and tags
- 👤 Author profiles with bio and avatars
- 🏷️ Category organization
- 📱 Fully responsive design
- ⚡ Server-side rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a0ea4f6f2c683f5f2b292e2&clone_repository=6a0ea5d5f2c683f5f2b29311)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- Bun installed
- Cosmic account with the required content model

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with depth
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with the following object types: posts, authors, categories.

## Deployment Options

- Deploy to [Vercel](https://vercel.com)
- Deploy to [Netlify](https://netlify.com)

<!-- README_END -->