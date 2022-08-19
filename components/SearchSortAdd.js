import { useCallback, useState } from 'react'
import styles from '../styles/SearchSortAdd.module.scss'
import { formatDate } from '../utils/utils'

function SearchSortAdd({ onChangeFilter, onSortClick, sortDirection, photos, setPhotos }) {

  const [addPostDialog, setAddPostDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const addButtonDialogOpener = useCallback(() => {
    setAddPostDialog(!addPostDialog)
  },
    [setAddPostDialog, addPostDialog],
  )

  const addPostSubmitHandler = useCallback((event) => {
    event.preventDefault();
    const { target } = event;

    const newPhoto = {
      id: Number(target.id?.value),
      url: target.url?.value,
      title: target.title?.value,
      createDate: formatDate(new Date())
    }

    if (!Number.isInteger(+target.id.value)) {
      setErrorMessage('Picture ID should be an integer')
    } else if (photos.some(photo => photo.id === Number(target.id.value))) {
      setErrorMessage('Photo with this ID already exists')
    } else if (!target.id.value || !target.url.value || !target.title.value) {
      setErrorMessage('You must fill all fields')
    } else {
      setErrorMessage('Great!')
      setPhotos(prev => [...prev, newPhoto])
      setTimeout(() => setErrorMessage(''), 2000)
      return
    }
  },
    [setErrorMessage, photos, setPhotos],
  )

  return (
    <div className={styles.searchSortAddContainer}>
      <div className={styles.searchSortContainer}>
        <button onClick={onSortClick}>
          {sortDirection ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgba(82, 140, 255, 0.7)"><path d="M6 3l-6 8h4v10h4v-10h4l-6-8zm16 6h-8v-2h8v2zm2-6h-10v2h10v-2zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z" /></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgba(82, 140, 255, 0.7)"><path d="M6 21l6-8h-4v-10h-4v10h-4l6 8zm16-12h-8v-2h8v2zm2-6h-10v2h10v-2zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z" /></svg>
          }
        </button>
        <div className={styles.input_control}>
          <input onChange={onChangeFilter} id="lookingId" placeholder=' ' />
          <label>FILTER BY PHOTO ID</label>
        </div>
      </div>
      <div className={styles.addContainer}>
        {!addPostDialog ? (
          <div style={{ marginTop: '10px'}}>
            <button
              className={styles.button}
              onClick={addButtonDialogOpener}
              style={{ '--color': 'rgba(0, 163, 98, 0.7)' }}
            >
              ADD NEW PHOTO
            </button>
          </div>
        ) : (
          <div className={styles.container}>
            <form className={styles.postform} onSubmit={addPostSubmitHandler} name="myform">
              <div className={styles.form_content}>
                <input id="id" name="id" placeholder="ID" type="text" />
                <input id="url" name="url" placeholder="URL" type="text" />
                <input id="title" name="title" placeholder="TITLE" type="text" />
                <button type='submit' className={styles.button}>
                  ADD NEW PHOTO
                </button>
              </div>
              <div style={{ marginTop: '10px' }}>
                <button
                  className={styles.button}
                  onClick={addButtonDialogOpener}
                  style={{ '--color': 'rgba(255, 58, 58, 0.7)' }}
                > CLOSE </button>
              </div>
            </form>
          </div>
        )
        }
        {errorMessage &&
          <div className={styles.errorContainer}> {errorMessage} </div>}
      </div >
    </div >
  )
}

export default SearchSortAdd
