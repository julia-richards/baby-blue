import { Link } from "react-aria-components";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">J & D Forever</Link>
      <ul>
        <li>
          <Link href="/getting-here">Traveling</Link>
        </li>
        <li>
          <Link href="/packing-list">Packing</Link>
        </li>
        <li>
          <Link href="/lodging">Sleeping</Link>
        </li>
        <li>
          <Link href="/stuff-to-do">Playing</Link>
        </li>
        <li>
          <Link href="/schedule">Schedule</Link>
        </li>
        <li>
          <Link
            href="https://withjoy.com/julia-and-dan-eclr2u0s9o002n01zlaa5t1k0ps/registry"
            target="_blank"
          >
            Registry
          </Link>
        </li>
        <li>
          <Link href="/rsvp">RSVP</Link>
        </li>
      </ul>
    </nav>
  );
}
