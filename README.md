# Manik Dingra — Portfolio

A One Piece–themed personal portfolio built with Next.js, live at [manik-dingra.in](https://manik-dingra.in).

## Tech Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 3 (shadcn-style HSL theme tokens, light "parchment" / dark "ocean" modes via `next-themes`)
- Three.js via React Three Fiber + drei (3D ocean scene, devil fruits)
- Framer Motion
- Lenis smooth scroll
- Resend (contact form email)

## Project Structure

```
├── app/
│   ├── api/contact/route.ts   # Contact form endpoint (Resend + in-memory rate limit)
│   ├── globals.css            # Theme tokens and utilities (.glass, .parchment-glass, .map-texture)
│   ├── layout.tsx             # Metadata, fonts, ThemeProvider, NavBar, Footer
│   ├── page.tsx               # Single page composing all sections
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── navbar.tsx             # Nav + mobile menu; exports shared `socialLinks`
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   ├── sections/              # Hero, About, Experience, Skills, Projects, Freelance, Contact
│   ├── three/                 # WebGL scene: ocean, Going Merry, treasure, devil fruits (lazy-loaded)
│   └── ui/                    # TiltCard, CustomCursor, and the 2D fallback (SeaParticles, OnePieceBackground)
├── lib/
│   ├── lenis-scroll.tsx       # Smooth scroll setup
│   └── utils.ts               # cn() helper
└── public/                    # Favicons, OG image, web manifest
```

3D is enabled on screens ≥768px with WebGL2 and no reduced-motion preference; everything else gets the flat 2D theme. All three.js code loads through `components/three/lazy.ts` so it is one deferred chunk.

Section content (projects, experience, skills, freelance work) lives as arrays inside each component in `components/sections/`.

## Setup

```bash
git clone https://github.com/M-A-N-I-K/manik-dingra
cd manik-dingra
pnpm install
```

Create `.env.local` for the contact form:

```bash
RESEND_API_KEY=your_resend_api_key
```

```bash
pnpm dev     # development server
pnpm lint    # ESLint
pnpm build   # production build
```

## License

MIT

## Author

Manik Dingra — [GitHub](https://github.com/M-A-N-I-K) · [LinkedIn](https://www.linkedin.com/in/manik-dingra/)
