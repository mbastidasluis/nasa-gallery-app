import fetcher from "../../utils/fetcher"

/**
 * API route that fetches a rovers associated metadada
 * @param {*} req request objec
 * @param {*} res response object
 */
export default async function handler(req, res) {
  res.send(
    req.query.rover
      ? await fetcher(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.query.rover}?api_key=${process.env.NASA_API_KEY}`)
      : { message: 'a valid rover name must be specified' }
  )
}
