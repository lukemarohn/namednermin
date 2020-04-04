import React from 'react'

import LightboxReact from 'lightbox-react'
import Img from 'gatsby-image'
import NonStretchedImage from './nonStretchedImage'

const Lightbox = ({images, selectedImage, handleClose, handlePrevRequest, handleNextRequest}) => {
  const array = []

  images.forEach(image => {
    console.log(image.media_details.fileformat)
    const localCopy = image.localFile
    if (localCopy && localCopy.internal.mediaType === 'image/gif') {
      array.push(<div className='gatsby-image-wrapper' style={{ position: 'relative', overflow: 'hidden' }}>
                   <img src={localCopy.publicURL} style={{ display: 'block', margin: 'auto', width: '100%', maxHeight: '100vh' }} />
                 </div>)
    } else if (image.media_details.fileformat === 'mp4') {
      array.push(
        <div className='gatsby-image-wrapper' style={{ position: 'relative', overflow: 'hidden' }}>
          <video
            style={{ display: 'block', margin: 'auto', width: '100%', maxHeight: '100vh' }}
            muted
            controls='false'
            playsinline='false'>
            <source src={localCopy.publicURL} type='video/x-m4v' />
          </video>
        </div>
      )
    } else if (image.acf && image.acf.video_embed_url && image.acf.video_embed_url != '') {
      array.push(
        <div className='video-container iframe'>
          <iframe
            src={image.acf.video_embed_url}
            frameborder='0'
            allow='autoplay; fullscreen'
            allowfullscreen />
        </div>
      )
    } else {
      array.push(<NonStretchedImage fluid={localCopy.childImageSharp.fluid} />)
    }
  })

  return (
    <LightboxReact
      enableZoom={false}
      clickOutsideToClose={true}
      mainSrc={array[selectedImage]}
      nextSrc={array[(selectedImage + 1) % array.length]}
      prevSrc={array[(selectedImage + array.length - 1) % images.length]}
      onCloseRequest={handleClose}
      onMovePrevRequest={handlePrevRequest(selectedImage, array.length)}
      onMoveNextRequest={handleNextRequest(selectedImage, array.length)} />
  )
}

export default Lightbox
