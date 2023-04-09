import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import coffeeStoresData from '../../data/coffee-stores.json'
import styles from '../../styles/cofee-store.module.scss'
import cls from 'classnames'
import Image from 'next/image'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {TiLocationOutline} from 'react-icons/ti'
import {AiFillStar} from 'react-icons/ai'

// Generates `/coffee-stores/1` and `/coffee-stores/2`
export async function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore)=>{
      return {
        params: {
          id:coffeeStore.id.toString(),
        }
      }
  });
  return {
    paths /* [{ params: { id: '1' } }, { params: { id: '2' } }] */,
    fallback: true, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const {params} = context 
  console.log("Path params :",params );/* shown in terminal */
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "prj_live_sk_16d90f3831cdb5e0ac97ac19f99b1f80c3d9ddec",
    },
  };
  const response = await fetch(
    'https://api.radar.io/v1/search/autocomplete?query=coffee&near=40.70390%2C-73.98670',
    options
  )
  const data = await response.json()
  console.log(data.addresses.map((address)=> address.placeLabel));
  return {
    // Passed to the page component as props
    props: { coffeeStore: data.addresses.find((coffeeStore)=>{
      return coffeeStore.number.toString() === params.id 
    }) },
  }
}
const UpVoteHundler = ()=>{
  console.log('UpVote !');
}
const coffee_store = ({coffeeStore}) => {
    // Render coffeeStore...
    const router = useRouter()
    /* console.log(router); shown in terminal */
   /* console.log(coffeeStore); shown in terminal */
    if (router.isFallback) {
      return <div>Loading...</div>
    }
    const {placeLabel,formattedAddress} = coffeeStore
  return (
    <div>
      <Head>
          <title>{placeLabel}</title>
      </Head>
      <div className={ cls("container",styles.main)}>
        <Link href={'/'} className={styles.link}>
          <MdOutlineKeyboardBackspace className={styles.icon}/>
          Back to home
        </Link>
        <div className={styles.content}>
          <div className={styles.part1}>
            <h1>{placeLabel}</h1>
            <Image  src={"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} className={styles.image} alt={placeLabel}  width={500} height={250} ></Image>
          </div>
          <div className={styles.part2}>
            <div className={styles.adr}><TiLocationOutline className={styles.icon}/>{formattedAddress}.</div>
            <div className={styles.rating}><AiFillStar className={styles.icon}/>10</div>
            <button onClick={UpVoteHundler}>Up Vote!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default coffee_store

/* 
The idea here is to get the the prop depending on the path:
 return coffeeStore.id.toString() === params.id 
 then pass the prop to the component to render it 

Note:
 make sure you get the dynamic route by 'id': 
 href = {`./coffee-stores/${coffeStore.id}`} 
*/