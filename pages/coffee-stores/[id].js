import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import coffeeStoresData from '../../data/coffee-stores.json'

// pages/coffee-stores/[id].js

// Generates `/coffee-stores/1` and `/coffee-stores/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const {params} = context 
  console.log("Path params :",params );/* shown in terminal */
  return {
    // Passed to the page component as props
    props: { coffeeStore: coffeeStoresData.find((coffeeStore)=>{
      return coffeeStore.id.toString() === params.id 
    }) },
  }
}
const coffee_store = ({coffeeStore}) => {
    // Render coffeeStore...
    const router = useRouter()
    console.log(router);/* shown in terminal */
    console.log(coffeeStore);/* shown in terminal */
  return (
    <div>
      <Head>
          <title>{router.query.id}</title>
      </Head>
      coffee with id of {router.query.id}
      <br/>
      <Link href={'/'}> Back to home</Link>
      <br/>
    </div>
  )
}

export default coffee_store

/* 
The idea here is to get the the prop depending on the path:
 return coffeeStore.id.toString() === params.id 
 then pass the prop to the component to render it 
 */