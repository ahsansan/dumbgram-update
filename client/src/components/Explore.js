// Custom Css
import '../styles/components/explore.css'
// Mansory Element
import Mansory from './MansoryForExplore'

function ExploreMansory() {

    const imageUrls = [
        '/images/photos/Rectangle 6.png',
        '/images/photos/Rectangle 5.png',
        '/images/photos/Rectangle 10.png',
        '/images/photos/Rectangle 3.png',
        '/images/photos/Rectangle 9.png',
        '/images/photos/Rectangle 4.png',
        '/images/photos/Rectangle 8.png',
        '/images/photos/Rectangle 12.png',
    ]

    return(
		<div className='mansory-container-exp'>
            <Mansory imageUrls={imageUrls}></Mansory>
        </div>
    )
}

export default ExploreMansory;