import React from 'react'
import Link from 'next/link'

const Nextjs = () => {
  return (
    <div>
      welcome to nextjs with antika and this is a Link for known page <br/>
      <Link href='/'>
        back to home
      </Link>
      <br/>
      Otherwise this link for dynamic route
      <br/>
      <Link href='../dynamic/AA'>go to dynamic route</Link>
    </div>
  )
}

export default Nextjs