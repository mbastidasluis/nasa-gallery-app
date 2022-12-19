import { useBaseURL } from "../../hooks/useBaseURL"
import fetcher from "../../utils/fetcher"

/**
 * API route that fetches the current rovers names and then fetches the metadata for each rover.
 * @param {*} req request objec
 * @param {*} res response object
 */
export default async function handler(req, res) {

  const isDevMode = process.env.NODE_ENV !== 'production'
  // TODO add production URL
  // Checking if the app is in development mode.
  // The base URL must be included when calling another API from here.
  const baseURL = isDevMode ? 'http://localhost:3000' : ''

  /* Fetching the current rovers names from the API. */
  const roversNames = await fetcher(`${baseURL}/api/currentRovers`)

  if (roversNames) {
    const roversMetadataRequest = await Promise
      .all([...roversNames
        .map(roverName =>
          fetcher(`${baseURL}/api/roverMetadata?rover=${roverName}`)
        )
      ])
    let roversData = {}
    roversMetadataRequest.forEach(({
      photo_manifest: { name, status, max_sol, ...rest }
    }) => {
      roversData[name] = { status, martianDays: max_sol }
    })
    res.send({ roversMetadata: roversData })
  }
  res.send()
}
