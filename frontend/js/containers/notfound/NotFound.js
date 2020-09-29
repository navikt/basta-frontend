import React from 'react'
const notFound = require('../../../img/404.jpg')

export const NotFound = () => {
  return (
    <div>
      <br />
      <br />
      <h2>404</h2>
      <br />
      <br />
      <img src={notFound} alt={'404'} /> <br /> <br />
      <div>
        <h3>Somethin' be not quite alstarboard up thar, matey</h3>
      </div>
    </div>
  )
}
