import Head from "next/head"
import styles from '../styles/MainContainer.module.scss'

import A from "./A"

function MainContainer({ children, keywords, backToMain }) {
  return (
    <>
      <Head>
        <meta keywords={"My Album" + keywords}></meta>
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
