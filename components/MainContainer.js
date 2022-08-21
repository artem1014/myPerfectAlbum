import Head from "next/head"
import styles from '../styles/MainContainer.module.scss'

import A from "./A"

function MainContainer({ children, keywords, backToMain }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta keywords={"My Album" + keywords} />
        <title>{'My Album ' + keywords}</title>
      </Head>
      <div className={styles.navbar}>
        <A href="/">
          {backToMain ?
            <h2> Back To Main Page</h2>
            :
            <h2> Main Page</h2>
          }
        </A>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}

export default MainContainer
