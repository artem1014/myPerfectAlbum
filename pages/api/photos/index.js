import { photos } from '../../../data'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(photos.sort((a, b) => a.id - b.id))
  } else if (req.method === 'POST') {
    const newPhoto = req.body.newPhoto
    photos.push(newPhoto)
    photos.sort((a, b) => a.id - b.id)
    res.status(201).json(photos)
  } else if (req.method === 'PUT') {
    const { sortDirection, sortType } = req.body
    if (+sortType) {
      if (!sortDirection) {
        photos.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
      } else {
        photos.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
      }
    } else {
      if (!sortDirection) {
        photos.sort((a, b) => b.id - a.id)
      } else {
        photos.sort((a, b) => a.id - b.id)
      }
    }
    res.status(201).json(photos)
  } else if (req.method === 'DELETE') {

    const index = photos.findIndex((photo) => photo.id === Number(req.body.id))

    photos.splice(index, 1)
    res.status(201).json(photos)
  }
}
