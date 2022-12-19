/**
 * API route that defines the current valid rover names
 * @param {*} req request objec
 * @param {*} res response object
 */
export default async function handler(req, res) {
  res.json(['Curiosity', 'Opportunity', 'Spirit'])
}
