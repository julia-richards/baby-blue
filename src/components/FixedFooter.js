"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./FixedFooter.module.css";

const LINKS = [
  { href: "/getting-here", label: "Travel" },
  { href: "/lodging", label: "Sleep" },
  { href: "/packing-list", label: "Pack List", accent: true },
  { href: "/stuff-to-do", label: "Play" },
  { href: "/schedule", label: "Schedule" },
  {
    href: "https://withjoy.com/julia-and-dan-eclr2u0s9o002n01zlaa5t1k0ps/registry",
    label: "Registry",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  // { href: "/rsvp", label: "RSVP", accent: true },
];

const FixedFooter = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.Nav}>
      <ul>
        {LINKS.map(({ href, label, accent, ...linkProps }) => {
          const isActive =
            href.length === 1 ? pathname === href : pathname.startsWith(href);

          return (
            <li
              key={href}
              className={[
                isActive && styles.ActiveItem,
                accent && styles.AccentItem,
              ].filter(Boolean)}
            >
              <Link href={href} {...linkProps}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FixedFooter;
