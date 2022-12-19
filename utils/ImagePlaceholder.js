import { useEffect, useState } from "react"
import ContentLoader from "react-content-loader";
import styles from '../styles/Home.module.css'

/**
 * It renders an image and a content loader. When the image is loaded, the content loader is hidden and
 * the image is displayed
 * @returns A function that returns a component.
 */
export default function ImagePlaceholder({ src, pictureDate }) {
    const [loaded, setLoaded] = useState(false)
    const [imageStyle, setImageStyle] = useState({ display: 'none' })

    const handleImageLoad = () => {
        setLoaded(true)
    }

    useEffect(() => {
        if (loaded) setImageStyle({})
    }, [loaded])


    useEffect(() => {
        if (loaded) {
            setLoaded(false)
            setImageStyle({ display: 'none' })
        }
    }, [src])

    return (
        <>
            {
                <Image
                    src={src}
                    imageStyle={imageStyle}
                    pictureDate={pictureDate}
                    handleImageLoad={handleImageLoad}
                />
            }
            {!loaded &&
                <ContentLoader
                    speed={2}
                    width={350}
                    height={350}
                    viewBox="0 0 350 350"
                    backgroundColor="#deddda"
                    foregroundColor="#ffffff"
                >
                    <rect x="0" y="0" rx="2" ry="2" width="350" height="350" />
                </ContentLoader>
            }
        </>
    )
}

const Image = ({ pictureDate, src, imageStyle, handleImageLoad }) =>
    <div style={imageStyle}>
        <h5>Picture date: {pictureDate}</h5>
        <img src={src} onLoad={handleImageLoad} className={styles.photo} />
    </div>