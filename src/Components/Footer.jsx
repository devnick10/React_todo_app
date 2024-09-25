import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='fcontainer'>
      <p> © 2024 <Link to={'https://github.com/devnick10'}>devnick</Link> . All rights reserved.</p>
    </div>
  )
}

export default Footer
