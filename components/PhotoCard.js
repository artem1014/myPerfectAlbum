import styles from '../styles/PhotoCard.module.scss'
import A from './A'

function PhotoCard({ id, url, title, deleteHandler, date }) {
  return (
    <A href={`/photos/${id}`}>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.image}>
            <img src={url} alt="Should be a photo here" />
          </div>
          <div className={styles.title_post}>
            <h2>{id}</h2>
            <span>Create date: {date}</span>
            <p>{title}</p>
            <button id={id} onClick={deleteHandler}> DELETE </button>
          </div>
        </div>
      </div>
    </A>

  )
}

export default PhotoCard
