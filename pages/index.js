import { useCallback, useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer'
import PhotoCard from '../components/PhotoCard';
import Filters from '../components/Filters';
import styles from '../styles/Home.module.scss'
import { formatDate } from '../utils/utils';

export default function Home({ posts }) {

  const [photos, setPhotos] = useState(posts);
  const [sortDirection, setSortDirection] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const onSortClick = useCallback(() => {
    if (sortDirection) {
      setPhotos(photos.sort((a, b) => a.id - b.id))
    } else {
      setPhotos(photos.sort((a, b) => b.id - a.id))
    }
    setSortDirection(!sortDirection)
  }, [setSortDirection, sortDirection, photos])

  const onChangeFilter = useCallback((event) => {
    setFilterValue(event.target.value)
  }, [setFilterValue])

  const deleteHandler = useCallback((event) => {
    event.preventDefault()
    setPhotos(photos.filter((photo) => photo.id !== Number(event.target.id)))
  }, [setPhotos, photos])

  useEffect(() => {
    photos.forEach(photo => photo.createDate = formatDate(new Date()))
  }, [])

  return (
    <MainContainer keywords={'Main Page'}>
      <>
        <Filters
          onChangeFilter={onChangeFilter}
          onSortClick={onSortClick}
          sortDirection={sortDirection}
          photos={photos}
          setPhotos={setPhotos}
        />
        <div className={styles.w}>
          {photos
            .filter(ph => ph.id.toString().includes(filterValue) || filterValue === '')
            .map((photo) => (
              <PhotoCard
                id={photo.id}
                url={photo.url}
                title={photo.title}
                key={photo.id}
                deleteHandler={deleteHandler}
              />
            ))}
        </div>
      </>
    </MainContainer >
  )
}

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos')
  const posts = (await response.json()).slice(0, 100)
  return {
    props: { posts },
  }
}
