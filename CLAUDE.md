# CLAUDE.md — Personal Portfolio Website

You are my senior frontend engineer, UI/UX designer, and technical architect.

We're building my personal portfolio website from scratch.

This is **not** a one-off code generation task.

You are helping me build a production-quality application over multiple iterations, like a real engineering team.

Every architectural decision should prioritize:

* scalability
* maintainability
* clean code
* accessibility
* performance
* consistency
* beautiful design

Whenever there is a tradeoff, optimize for long-term quality rather than writing the fastest code.

---

# Primary Goal

The portfolio should feel less like a typical "developer portfolio" and more like a polished consumer product.

Someone visiting should think:

> "This feels like a premium website."

instead of

> "This looks like another React portfolio."

---

# Audience

Primary:

* Software Engineering recruiters
* Engineering managers
* Internship recruiters

Secondary:

* Engineers
* Designers
* Friends

The website should demonstrate engineering ability through craftsmanship, not by overwhelming visitors with technology.

---

# Tech Stack

Framework

* Next.js 16 (App Router)

Language

* TypeScript (strict)

Styling

* Tailwind CSS v4

Animation

* Framer Motion

Icons

* Lucide React

Theme

* next-themes

Utilities

* clsx
* tailwind-merge

UI primitives

* shadcn/ui (only when useful)

Deployment

* Vercel

Repository

* GitHub

---

# Design Inspiration

Direction: **NYC kid who happens to be an engineer** — streetwear as visual
language, not costume.

Think:

* SNKRS × NYC subway × editorial street photography × engineering portfolio

Not:

* Supreme clone with code on it
* Generic Apple/Linear developer template

Characteristics:

* premium but personal
* editorial / image-forward
* bold condensed type
* mostly blue (navy → denim washes)
* paper grain / scanned imperfections
* confident whitespace
* restrained motion

Avoid:

* box-logo / graffiti costume aesthetics
* neon colors / rainbow UI
* glassmorphism everywhere
* generic portfolio templates
* flashy effects
* excessive gradients

---

# Theme

Support

* Light mode
* Dark mode
* System preference (default)
* Persisted theme

Theme control lives as a quiet fixed control in the bottom-left corner —
not in the navbar. Dark mode should feel like night-city navy/charcoal,
never pure black.

Transitions between themes should feel smooth.

---

# Brand & Color System

NYC × streetwear palette: mostly blue, warm paper neutrals, tiny accent
hits. The interface stays approximately 90% blue-neutral — personality
comes from type, texture, and photography, not rainbow chrome.

Do NOT use purple as the primary brand color.

## Brand Colors

* Primary: Deep navy / midnight blue
* Secondary atmosphere: Washed / denim blues
* Background: Warm paper / newsprint
* Accent punctuation: Taxi yellow (rare), chrome silver, rare signal red

Navy is used for branding, active navigation, links, decorative
elements, and primary buttons. Taxi yellow is the main accent, used
sparingly — think cab flash, not a yellow site. Chrome and signal red
are micro-only. Mets orange appears only on rivalry stickers.

## Light Theme

* Background: warm paper
* Elevated surfaces: soft off-white paper
* Primary text: ink
* Secondary text: slate
* Borders: warm gray
* Atmosphere: denim wash
* Accent: muted golden yellow

## Dark Theme

* Background: night-city navy (never pure black)
* Cards: slightly lighter blue-charcoal
* Primary text: soft white
* Secondary text: muted blue-gray
* Accent: muted golden yellow
* Navy lifts so it stays visible on dark

## Color Usage Rules

Do NOT overuse accent colors. Never create entire yellow or red sections.

Gold should primarily appear in:

* small highlights and underlines
* rare CTAs / badges
* hover punctuation

Photography and album/food imagery supply life and color. UI stays blue-paper.

## Texture

Subtle film/paper grain on the body (and stronger on hero photography /
project covers). Keep opacity low — if grain reads first, dial it back.

## Quiet NYC signals

Use these as attitude, not costume (no skylines, no I♥NY):

* Taxi yellow as rare accent (links/underlines/badges — never full sections)
* Pigeon cursor + 404 easter egg
* Yankees-adjacent navy pinstripe (whisper background)
* BX / QNS pole stickers (Yankees ↔ Mets energy, no league logos)
* Transparent bridge cable arcs on the hero
* Place crumbs — Flushing · Amherst · San Francisco
* City-block rules between sections
* MetroCard-inspired project deck backs
* Late-night navy wash on footer + experience map stage
* `J·Y` / `EST. NYC` stamp (footer + quiet corner)

Config lives in `siteConfig.places` / `siteConfig.stamp`.
Subway line bullets / STOP· labels were retired — too “system.”
## Section Identity

Maintain a cohesive design system with subtle per-section personality:

* Home / Projects / Experience: navy + denim washes
* Eats: slightly warmer tones; gold may appear a little more frequently
* Music: very subtle purple accents only where they complement album
  artwork or Spotify UI—purple never becomes primary

## Implementation

Colors are defined as semantic CSS variables in `src/styles/globals.css`
and mapped into Tailwind via `@theme`. Components reference semantic
tokens (`brand`, `accent`, `wash`, `chrome`, `signal`, `primary`, `link`,
`foreground`, `muted`, `background`, `border`), never raw hex values.

Token groups:

* `brand` / `brand-strong` / `brand-foreground` — navy
* `wash` / `wash-strong` — denim atmosphere
* `accent` / `accent-strong` / `accent-foreground` — gold
* `chrome` / `signal` — micro punctuation
* `primary` / `primary-hover` / `primary-foreground` — navy (buttons)
* `link` / `link-hover` — navy
* `plum` — reserved for the Music section only

Section identity is applied with scoped classes (`.section-eats`,
`.section-music`) that re-point tokens for their subtree.

## Typography

* Display: Barlow Condensed (bold, uppercase for brand/section titles)
* Body: IBM Plex Sans

Loud type, quiet layout.

## Buttons

* Primary: deep navy background, white text, hover transitions
* Secondary: outline, navy border on hover
* Ghost: transparent, elegant hover state
* Accent (rare): muted golden yellow background, dark text—reserved for
  important calls to action

## Hover States

Hovers should feel premium and restrained. Examples: image slightly
scales, border becomes navy, subtle shadow, yellow underline animation
(`.link-underline`), icon slightly translates. Avoid flashy effects.

## Overall Feeling

NYC energy. Editorial. Intentional. Mostly blue. Personal without costume.

Not colorful, not generic SaaS, not a streetwear parody.

---

# Responsive Design

The website must be fully responsive.

Design mobile-first.

Support:

* phones
* tablets
* laptops
* ultrawide monitors

Every page should feel intentionally designed—not merely resized.

---

# Navigation

Top navigation

Home

Projects

Experience

Lifestyle

Sticky navbar.

Blur while scrolling.

Smooth transitions.

Elegant mobile menu.

Current page indicator.

---

# Footer

Minimal.

Include icon links for

GitHub

LinkedIn

Email

Spotify

Small technology credit.

---

# Pages

## Home

Sections

Hero

About

Featured Projects

Current

Social Links

Brand through-line (everywhere, especially home):

The one thing to take away: Jennifer can't sit still —
whether that's learning, building, or exploring.

The hero should immediately communicate:

Jennifer Ye

I can't sit still — whether that's learning, building, or exploring.

Primary CTA

View Projects

The Current section reinforces the triad: Learning / Building / Exploring.
Lifestyle is the "exploring" surface (eats + music). Projects and
Experience are the "building." Curiosity and craft are the "learning."

---

## Projects

The most important page.

Inspired by SNKRS product cards.

Large visual cards.

Each project has its own dynamic route.

Examples

/projects/map-response

/projects/vaip

/projects/popped-up

Each project page supports

* hero image
* overview
* problem
* solution
* architecture
* screenshots
* lessons learned
* technology stack
* GitHub
* demo

---

## Experience

Vertical timeline.

Alternating cards on desktop.

Single-column on mobile.

Smooth reveal animations.

Each item includes

company

role

dates

location

description

technologies

---

## Lifestyle

Two sections.

### Eats

Restaurant cards.

Large photography.

Favorite dish.

Rating.

Short review.

Editorial layout.

### Music

Album cards.

Current favorites.

Artist.

Favorite song.

Spotify link.

Apple Music-inspired presentation.

---

# Content Management

Do NOT hardcode content inside pages.

Use typed data sources.

Example

src/content/projects.ts

src/content/experience.ts

src/content/restaurants.ts

src/content/music.ts

Pages should render from structured data.

Future updates should require editing only the content files.

---

# Component Architecture

Create reusable components.

Examples

Navbar

Footer

Container

Button

Badge

SectionHeader

ThemeToggle

SocialLinks

ProjectCard

TimelineCard

RestaurantCard

AlbumCard

AnimatedSection

ImageCard

ScrollProgress

BackToTop

LoadingSkeleton

Keep components composable and reusable.

---

# Motion

Framer Motion should enhance—not distract.

Use

* fade in
* stagger
* hover scale
* page transitions
* section reveals
* subtle parallax where appropriate

Avoid animations that become annoying after repeated visits.

---

# Typography

Display: Barlow Condensed — bold, often uppercase for brand and section titles.
Body: IBM Plex Sans — clean grotesque for reading UI.

Large headings. Editorial hierarchy. Comfortable reading width. Excellent
spacing. Loud type, quiet layout. Use next/font for optimized loading.

---

# Images

Use next/image.

Optimize image loading.

Support responsive images.

Lazy load where appropriate.

---

# Accessibility

Keyboard navigation.

Visible focus states.

Semantic HTML.

ARIA labels.

Reduced motion support.

Excellent Lighthouse accessibility score.

---

# Performance

Minimize Client Components.

Prefer Server Components.

Use dynamic imports where appropriate.

Optimize images.

Optimize fonts.

Keep JavaScript bundle small.

---

# SEO

Use the Metadata API.

Generate

* page titles
* descriptions
* Open Graph metadata
* Twitter cards
* sitemap
* robots.txt
* favicon

Every project page should have unique metadata.

---

# Future Features

Architect the project so these can be added later without major refactoring:

* Spotify API

  * currently playing
  * recently played
  * playlists

* GitHub API

  * contribution graph
  * recent repositories
  * commit activity

* Contact form

* Blog using MDX

* Photography gallery

* Reading list

* Interactive project filtering

* Search

* Analytics

* Custom domain

Design the architecture with these future integrations in mind.

---

# Folder Structure

Organize professionally.

src/

app/

components/

components/layout/

components/ui/

components/sections/

content/

hooks/

lib/

types/

styles/

public/

Keep everything modular.

---

# Code Standards

Strict TypeScript.

No any.

Clean interfaces.

Reusable hooks.

Small focused components.

Consistent naming.

Senior-level code quality.

---

# Workflow

Do NOT build the entire project at once.

Instead, work in milestones.

Milestone 1

Project setup.

Architecture.

Folder structure.

Design tokens.

Theme.

Fonts.

Navigation.

Footer.

Milestone 2

Reusable component library.

Milestone 3

Home page.

Milestone 4

Projects.

Milestone 5

Experience.

Milestone 6

Lifestyle.

Milestone 7

Animations.

Milestone 8

SEO.

Performance.

Accessibility.

Refinement.

At the end of every milestone:

* explain architectural decisions
* identify technical debt
* recommend improvements before moving on

Think like a senior engineer shipping a premium product—not a code generator completing a one-time assignment.
