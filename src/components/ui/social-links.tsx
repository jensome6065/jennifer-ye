import { Github, Linkedin, Mail, Music2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  spotify: Music2,
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Renders the site's social links as icon buttons.
 * Data-driven from siteConfig so links stay consistent across the site.
 * Email opens the mail client; all others open in a new tab.
 */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {siteConfig.social.map(({ platform, label, href }) => {
        const Icon = ICONS[platform];
        const isExternal = !href.startsWith("mailto:");
        return (
          <li key={platform}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-background-elevated hover:text-foreground"
            >
              <Icon className={cn("h-[18px] w-[18px]", iconClassName)} strokeWidth={1.75} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
