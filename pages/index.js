import { useCallback, useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer'
import PhotoCard from '../components/PhotoCard';
import Filters from '../components/Filters';
import styles from '../styles/Index.module.scss'

export default function Index() {

  const [photos, setPhotos] = useState([]);
  const [sortDirection, setSortDirection] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const onSortClick = useCallback(async (sortType) => {

    setSortDirection(!sortDirection)

    const response = await fetch('api/photos', {
      method: 'PUT',
      body: JSON.stringify({ sortDirection, sortType }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();

    setPhotos(data.photos)

  }, [setSortDirection, sortDirection, photos])

  const onChangeFilter = useCallback((event) => {
    setFilterValue(event.target.value)
  }, [setFilterValue])

  const deleteHandler = useCallback(async (event) => {
    event.preventDefault()
    const response = await fetch('api/photos/', {
      method: 'DELETE',
      body: JSON.stringify({ id: event.target.id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setPhotos(data);
  }, [setPhotos, photos])

  const getData = async () => {
    const response = await fetch('/api/photos')
    const posts = await response.json()
    setPhotos(posts);
  }

  useEffect(() => {
    getData();
    if(sortDirection) {
      setSortDirection(!sortDirection)
    }
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
        <div className={styles.content}>
          {photos
            .filter(ph => ph.id.toString().includes(filterValue) || filterValue === '')
            .map((photo) => (
              <PhotoCard
                id={photo.id}
                url={photo.url}
                title={photo.title}
                date={photo.createDate}
                key={photo.id}
                deleteHandler={deleteHandler}
              />
            ))}
        </div>
      </>
    </MainContainer >
  )
}
