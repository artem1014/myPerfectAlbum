import Link from "next/link"
import styles from '../styles/A.module.scss'

function A({ children, href }) {
  return (
    <Link href={href}>
      <a className={styles.link}>{children}</a>
    </Link>
  )
}

export default A
