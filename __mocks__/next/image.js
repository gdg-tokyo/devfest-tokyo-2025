import React from 'react'

const Image = ({ src, alt, width, height, fill, ...props }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />
}

export default Image
