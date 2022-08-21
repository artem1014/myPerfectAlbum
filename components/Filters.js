import { useCallback, useState } from 'react'
import styles from '../styles/Filters.module.scss'
import { formatDate, validURL } from '../utils/utils'

function Filters({ onChangeFilter, onSortClick, sortDirection, photos, setPhotos }) {

  const [addPostDialog, setAddPostDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [sortType, setSortType] = useState(0)

  const addFormToggler = useCallback(() => {
    setAddPostDialog(!addPostDialog)
  },
    [setAddPostDialog, addPostDialog],
  )

  const formSubmitHandler = useCallback(async (event) => {
    event.preventDefault();
    const { target } = event;

    const newPhoto = {
      id: Number(target.id?.value),
      url: target.url?.value,
      thumbnailUrl: target.url?.value,
      title: target.title?.value,
      createDate: formatDate(new Date())
    }

    if (!Number.isInteger(+target.id.value) || target.id.value < 0) {
      setErrorMessage('Picture ID should be an integer greater 0')
      setTimeout(() => setErrorMessage(''), 2000)
    } else if (photos.some(photo => photo.id === Number(target.id.value))) {
      setErrorMessage('Photo with this ID already exists')
      setTimeout(() => setErrorMessage(''), 2000)
    } else if (!target.id.value || !target.url.value || !target.title.value) {
      setErrorMessage('You must fill all fields')
      setTimeout(() => setErrorMessage(''), 2000)
    } else if (!validURL(target.url.value)) {
      setErrorMessage('Enter valid URL')
      setTimeout(() => setErrorMessage(''), 2000)
    } else {
      setAddPostDialog(false)
      setSuccessMessage('Great!')
      setTimeout(() => setSuccessMessage(''), 2000)

      const response = await fetch('api/photos', {
        method: 'POST',
        body: JSON.stringify({ newPhoto }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setPhotos(data);
    }
  },
    [setErrorMessage, photos, setPhotos],
  )

  const onSelectionChange = (event) => {
    setSortType(event.target.value)
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchSortContainer}>
        <div className={styles.sortContainer}>
          <div className={styles.labelContainer}>
            <label>SORT BY</label>
            <select defaultValue={0} onChange={onSelectionChange}>
              <option value={0}>ID</option>
              <option value={1}>Date</option>
            </select>
          </div>
          <button onClick={() => onSortClick(sortType)}>
            {sortDirection ?
              <img src='/sortAsc.svg' />
              :
              <img src='/sortDesc.svg' />
            }
          </button>
        </div>
        <div className={styles.input_control}>
          <input onChange={onChangeFilter} id="lookingId" placeholder=' ' />
          <label>FILTER BY PHOTO ID</label>
        </div>
      </div>
      <div className={styles.addContainer}>
        {!addPostDialog ? (
          <div className={styles.closeButtonContainer}>
            <button
              className={styles.button}
              onClick={addFormToggler}
              style={{ '--color': 'rgba(0, 163, 98, 0.7)' }}
            >
              ADD NEW PHOTO TO THE ALBUM
            </button>
          </div>
        ) : (
          <div className={styles.addPostContainer}>
            <form className={styles.postform} onSubmit={formSubmitHandler} name="myform">
              <div className={styles.form_content}>
                <input id="id" name="id" placeholder="ID" type="text" />
                <input id="url" name="url" placeholder="URL" type="text" />
                <input id="title" name="title" placeholder="TITLE" type="text" />
                <button type='submit' className={styles.button}>
                  SUBMIT
                </button>
              </div>
              <div className={styles.closeButtonContainer}>
                <button
                  className={styles.button}
                  onClick={addFormToggler}
                  style={{ '--color': 'rgba(255, 58, 58, 0.7)' }}
                > CLOSE </button>
              </div>
            </form>
          </div>
        )
        }
        {errorMessage &&
          <div className={styles.messageContainer}> {errorMessage} </div>}

        {successMessage &&
          <div
            className={styles.messageContainer}
            style={{
              color: 'rgb(16, 187, 0)',
              border: '1px solid rgba(13, 194, 0, 0.343)',
              boxShadow: '0px 10px 25px 2px rgba(0, 187, 28, 0.7)'
            }}
          >
            {successMessage}
          </div>
        }
      </div >
    </div >
  )
}

export default Filters
