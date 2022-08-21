import { photos } from '../../../data'

export default async function handler(req, res) {
  const onePhoto = photos.find((photo) => photo.id === +req.body.id)
  res.status(201).json(onePhoto)
}
