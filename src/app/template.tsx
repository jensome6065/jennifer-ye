import { PageTransition } from "@/components/layout/page-transition";

/**
 * App Router template — unlike `layout.tsx`, this remounts on every navigation.
 * We use that to wrap each page in an enter transition (see PageTransition).
 * Layout (navbar, footer) stays mounted in `layout.tsx`; only page content
 * animates in.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
