/**
 * An utility function to handle data fetching
 * @param  {...any} args URL to feth the data from
 * @returns data as JSON
 */
export default async function fetcher(...args) {
    const res = await fetch(...args)
    if (res.status !== 200) {
        console.log('res', res);
        return 'some error ocurred while fetching data.'
    }

    return res.json()
}