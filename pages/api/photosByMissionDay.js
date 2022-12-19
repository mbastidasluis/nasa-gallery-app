import fetcher from "../../utils/fetcher"

/**
 * It takes a request from the client, checks if the request contains a rover name and a mission day,
 * and if so, it fetches the data from the NASA API and sends it back to the client
 * @param req - the request object
 * @param res - the response object
 */
export default async function handler(req, res) {
  res.send(
    req.query.rover && req.query.missionDay
      ? await fetcher(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.rover}/photos?sol=${req.query.missionDay}&api_key=${process.env.NASA_API_KEY}`)
      : { message: 'a valid rover name must be specified' }
  )
}
