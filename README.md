# Modern Portfolio Website

A dynamic portfolio website built with Next.js 15, featuring smooth animations and a modern design aesthetic.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Motion
- Lenis Smooth Scroll

## Project Structure

```
└── M-A-N-I-K-manik-dingra/
    ├── components/
    │   ├── project-card.tsx
    │   ├── navbar.tsx
    │   ├── coming-soon.tsx
    │   ├── projects-section.tsx
    │   ├── hero-section.tsx
    │   ├── main-container.tsx
    │   ├── skills-section.tsx
    │   ├── experience-section.tsx
    │   ├── footer.tsx
    │   └── about-section.tsx
    ├── public/
    │   └── projects/
    ├── next.config.ts
    ├── lib/
    │   └── lenis-scroll.tsx
    ├── package.json
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── README.md
    └── app/
        ├── page.tsx
        ├── globals.css
        └── layout.tsx
```

## Components

### Main Sections
- `main-container.tsx`: Root container with scroll animations
- `hero-section.tsx`: Landing section with 3D effects
- `projects-section.tsx`: Interactive project showcase
- `skills-section.tsx`: Dynamic skills grid with filtering
- `experience-section.tsx`: Work experience timeline
- `about-section.tsx`: Personal introduction
- `footer.tsx`: Contact information and links

### Features
- Smooth scroll implementation using Lenis
- 3D hover effects and transitions
- Dynamic project cards with animations
- Interactive skills filtering
- Responsive design for all devices

## Setup

```bash
# Clone the repository 
https://github.com/M-A-N-I-K/manik-dingra

# Change directory
cd manik-dingra

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Configuration

Key configuration files:
- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Theme and styling customization
- `tsconfig.json`: TypeScript settings
- `lib/lenis-scroll.tsx`: Smooth scroll configuration

## License

MIT License

## Author

[Manik Dingra]
- GitHub: [@manikdingra](https://github.com/M-A-N-I-K)
