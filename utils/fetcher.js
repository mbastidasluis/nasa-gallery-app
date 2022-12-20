/**
 * An utility function to handle data fetching
 * @param  {...any} args URL to feth the data from
 * @returns data as JSON
 */
export default async function fetcher(...args) {
    try {
        const res = await fetch(...args)
        const response = await res.json()
        return response
    } catch (e) {
        console.log('args', args);
        console.error(e);
        return 'some error ocurred while fetching data.'
    }
}