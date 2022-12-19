import { useEffect, useState } from "react"


/**
 * It sets the base URL to the development URL if the app is in development mode, and to the production
 * URL if the app is in production mode
 * @returns An object with a baseURL property.
 */
export const useBaseURL = () => {
    const [baseURL, setBaseURL] = useState('')
    
    useEffect(() => {
        const isDevMode = process.env.NODE_ENV !== 'production'
        // TODO add production URL
        // Checking if the app is in development mode.
        // The base URL must be included when calling another API from here.
        setBaseURL(isDevMode ? 'http://localhost:3000' : 'https://nasa-gallery-app.vercel.app')
    }, [])

    return { baseURL }
}