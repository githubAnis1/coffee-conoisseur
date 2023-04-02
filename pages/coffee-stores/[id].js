import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'


const coffee_store = () => {
    const router = useRouter()
    console.log(router);
  return (
    <div>
      <Head>
          <title>{router.query.id}</title>
      </Head>
      coffee with id of {router.query.id}
    </div>
  )
}

export default coffee_store