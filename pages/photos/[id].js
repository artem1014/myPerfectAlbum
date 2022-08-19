import { useRouter } from "next/router"
import MainContainer from "../../components/MainContainer";
import styles from '../../styles/Home.module.scss'

export default function Photo({ photo }) {
  const { query } = useRouter();
  const keyword = `Photo ${photo.id}`

  return (
    <MainContainer keywords={keyword} backToMain>
      <div style={{ margin: '40px' }}>
        <div className={styles.content_posts}>
          <div className={`${styles.columns_wrap} ${styles.grid_blog}`}>
            <div className={styles.blog} style={{ width: 'calc(100%/4)' }}>
              <div className={styles.block}>
                <img src={photo.url} alt="photo_url" />
                <div className={styles.title_post}>
                  <h2>{query.id}</h2>
                  <p>{photo.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
  const photo = await response.json()
  return {
    props: { photo },
  }
}
