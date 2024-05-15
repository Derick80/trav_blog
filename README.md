# Readme

## Overview

- The Travel Blog is a minor pet project of mine. [Remix](https://remix.run/) has been my Framework of choice for the past year or so but the introduction of the App Router, React Server Components and Server Actions in Next.js 14 inspired me to build this project and see how my experience with Remix would translate to Next.js.

## Goals

### Build an Image Carousel

### Display Images using CSS Masonry Layout

-

## Technologies

- [Next.js](https://nextjs.org/) Typescript & App Router
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) for database ORM
- [PostgreSQL](https://www.postgresql.org/) for database
- [ShadcnUI](https://ui.shadcn.com/) for UI components
- [Cloudinary](https://cloudinary.com/) for image hosting and manipulation

## Features

### Image Manipulation

- I used Cloudinary to store and retreive responsive images.
- I had previously manually uploaded these images to Cloudinary and used the Cloudinary API to retrieve the images and their respective URLs. I may include that GIST in the future.
- Blur Image was used to create a blur effect on the image while it was loading.

  ```blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='

  ```
- I used KCdodds [github](https://github.com/kentcdodds/kentcdodds.com/blob/c5e26ec85b90a135730db7468b70f592b4cbb6dc/content/blog/building-an-awesome-image-loading-experience.mdx#L256)

### Image Carousel

- I used

### Markdown

- I used [Marked](https://marked.js.org/) to parse markdown strings into HTML
- I took inspiration from [Jacob Paris](https://www.jacobparis.com/content/remix-markdown-preview) and his Remix blog post on how to use build a DIY markdown editor and preview.


### Fly.io
- In one terminal
- ```❯ fly proxy 5555:5555 --app travel-blog```
- In another terminal
- ```fly ssh console -C "npm run prisma:studio"  --app travel-blog```