import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { fetchedCoffeStores } from '@/lib/coffeeStores'
import styles from '../../styles/cofee-store.module.scss'
import cls from 'classnames'
import Image from 'next/image'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {TiLocationOutline} from 'react-icons/ti'
import {AiFillStar} from 'react-icons/ai'

// Generates `/coffee-stores/1` and `/coffee-stores/2`
export async function getStaticPaths() {
  const coffeStores = await fetchedCoffeStores ();
  const paths =  coffeStores.map((coffeeStore)=>{
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
  const coffeStores = await fetchedCoffeStores ();
  return {
    // Passed to the page component as props
    props: { coffeeStore: coffeStores.find((coffeeStore)=>{
      return coffeeStore.id.toString() === params.id 
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
    const {name,addresse,imgUrl} = coffeeStore
  return (
    <div>
      <Head>
          <title>{name}</title>
      </Head>
      <div className={ cls("container",styles.main)}>
        <Link href={'/'} className={styles.link}>
          <MdOutlineKeyboardBackspace className={styles.icon}/>
          Back to home
        </Link>
        <div className={styles.content}>
          <div className={styles.part1}>
            <h1>{name}</h1>
            <Image  src={imgUrl} className={styles.image} alt={name}  width={500} height={250} ></Image>
          </div>
          <div className={styles.part2}>
            <div className={styles.adr}><TiLocationOutline className={styles.icon}/>{addresse}.</div>
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