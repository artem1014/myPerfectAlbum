import styles from '../styles/PhotoCard.module.scss'
import A from './A'

function PhotoCard({ id, url, title, deleteHandler}) {
  return (
    <div className={styles.content_posts}>
      <div className={`${styles.columns_wrap} ${styles.grid_blog}`}>
        <div className={styles.blog}>
          <A href={`/photos/${id}`}>
            <div className={styles.block}>
              <img src={url} alt="Should be a photo here" />
              <div className={styles.title_post}>
                <h2>{id}</h2>
                <p>{title}</p>
                <div className={styles.buttonContainer}>
                  <button id={id} onClick={deleteHandler}> delete </button>
                </div>
              </div>
            </div>
          </A>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
