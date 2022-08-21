import { useRouter } from "next/router"
import MainContainer from "../../components/MainContainer";
import styles from '../../styles/Post.module.scss'

export default function Photo({ photo }) {
  const { query } = useRouter();
  const keyword = `Photo ${photo.id}`

  return (
    <MainContainer keywords={keyword} backToMain>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          <div>
            <div className={styles.image}>
              <img src={photo.url} alt="Should be a photo here" />
            </div>
            <div className={styles.title_post}>
              <h2>{query.id}</h2>
              <p>{photo.title}</p>
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
