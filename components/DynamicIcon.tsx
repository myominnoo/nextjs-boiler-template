// ============================================================
//  /components/DynamicIcon.tsx
//  Renders a Lucide icon by the string name stored in client.ts.
//
//  Lucide doesn't support string-keyed dynamic imports at runtime,
//  so we maintain a curated map of every icon referenced in the
//  config. Add to ICON_MAP whenever you add a new icon to client.ts.
// ============================================================

import {
  AlarmClock,
  BadgeCheck,
  Bath,
  ClipboardList,
  Droplets,
  Facebook,
  Flame,
  Heart,
  Home,
  LucideProps,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Waves,
  Wrench,
  Zap,
  Menu,
  X,
  ChevronRight,
  Clock,
} from "lucide-react";

// ── Icon registry ──────────────────────────────────────────
// Key  = the string you put in client.ts (e.g. service.icon)
// Value = the Lucide component
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  "alarm-clock": AlarmClock,
  "badge-check": BadgeCheck,
  bath: Bath,
  "clipboard-list": ClipboardList,
  "chevron-right": ChevronRight,
  clock: Clock,
  droplets: Droplets,
  facebook: Facebook,
  flame: Flame,
  heart: Heart,
  home: Home,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  phone: Phone,
  shield: Shield,
  "shield-check": ShieldCheck,
  star: Star,
  waves: Waves,
  wrench: Wrench,
  x: X,
  zap: Zap,
};

// ── Props ─────────────────────────────────────────────────
interface DynamicIconProps extends LucideProps {
  /** Must match a key in ICON_MAP — sourced from client.ts */
  name: string;
}

// ── Component ─────────────────────────────────────────────
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = ICON_MAP[name];

  if (!Icon) {
    // Fail visibly in development; renders nothing in production
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[DynamicIcon] Unknown icon "${name}". Add it to ICON_MAP in /components/DynamicIcon.tsx.`,
      );
    }
    return null;
  }

  return <Icon {...props} />;
}
