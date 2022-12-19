import { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";

/**
 * Hook that fetches a random set of images from a rover selected randomly every 10 seconds.
 * @param roversMetadata - Data of the rovers. It includes the names and the number of days in the mission.
 * @returns An object with the following properties:
 * roversNames: An array of rover names
 * currentRover: The name of the rover that took the current photos
 * currentPhotos: An array of objects with the following properties:
 *      src: The URL of the image
 *      pictureDate: The date the image was taken
 *      id: The image id
 */
export function useRandomImage(roversMetadata) {
    const [roversNames, setRovernames] = useState([])
    const [currentRover, setCurrentRover] = useState()
    const [currentPhotos, setCurrentPhotos] = useState([])
    const [missionPhotos, setMissionPhotos] = useState({})

    useEffect(() => {
        if (roversMetadata) {
            setRovernames(Object.keys(roversMetadata))
        }
    }, [roversMetadata])

    useEffect(() => {
        let interval
        let isMounted = true

        const fectImages = async () => {
            let currentSet
            let currentPick = []
            const roverName = getRandomItem(roversNames)
            const missionDay = getRandomDay(roverName)

            if (!missionPhotos || !missionPhotos[roverName] || !missionPhotos[roverName][missionDay]) {
                const { photos } = await fetcher(`api/photosByMissionDay?rover=${roverName}&missionDay=${missionDay}`)
             // saving the selected set of photos for use again if rover name and mission day combination
             // is repeated by chance.
                currentSet = photos
                setMissionPhotos({
                    ...missionPhotos,
                    [roverName]: {
                        ...missionPhotos[roverName],
                        [missionDay]: currentSet
                    }
                })
            } else {
                currentSet = missionPhotos[roverName][missionDay]
            }

            if (currentSet) {
                while (currentPick.length < 4) {
                    const item = getRandomItem(currentSet)
                    setCurrentRover(item?.rover)
                    currentPick.push({ src: item?.img_src, pictureDate: item?.earth_date, id: item?.id })
                }
                setCurrentPhotos(currentPick)
            }
        }

        if (isMounted && roversNames.length) {
            interval = setInterval(fectImages, 10000)
            fectImages()
        }

        return () => {
            isMounted = false
            if (interval) clearInterval(interval)
        }

    }, [roversNames])


    /** utility methods */
    const getRandomIndex = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getRandomItem = (list) => {
        const randomIndex = getRandomIndex(0, list.length - 1)
        const randomItem = list[randomIndex]
        return randomItem
    }

    const getRandomDay = (roverName) => {
        return getRandomIndex(0, roversMetadata[roverName].martianDays)
    }
    /** utility methods */

    return { roversNames, currentPhotos, currentRover }

}