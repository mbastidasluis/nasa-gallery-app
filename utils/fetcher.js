/**
 * An utility function to handle data fetching
 * @param  {...any} args URL to feth the data from
 * @returns data as JSON
 */
export default async function fetcher(...args) {
    const res = await fetch(...args)
    return res.json()
}