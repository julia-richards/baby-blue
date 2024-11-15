import styles from "./LinkButton.module.css";

export default function LinkButton({ children, ...rest }) {
  return (
    <a className={styles.LinkButton} {...rest}>
      {children}
    </a>
  );
}
