import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import styles from '../../styles/Post.module.scss'

export default function Photo() {
  const { query } = useRouter()
  const [photo, setPhoto] = useState({});
  const keyword = `Photo ${photo.id}`
  const getPhoto = async () => {
    const response = await fetch('/api/onePhoto', {
      method: 'POST',
      body: JSON.stringify({ id: query.id }),
      headers: {
        'Content-type': 'application/json',
      },
    })

    const post = await response.json();
    setPhoto(post);
  }

  useEffect(() => {
    getPhoto();
  }, [])

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
              <span>Create date: {photo.createDate}</span>
              <p>{photo.title}</p>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}
