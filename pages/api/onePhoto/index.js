import { photos } from '../../../data'

export default async function handler(req, res) {
  const { id } = req.body
  const onePhoto = photos.find((photo) => photo.id === +id)
  res.status(201).json(onePhoto)
}
