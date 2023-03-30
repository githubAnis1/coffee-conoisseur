import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Banner from '@/components/banner/banner'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const viewSotresNearBy = () => {
    console.log('banner clicked');
  }

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <Banner buttonText= 'View Stores nearby' handleOnClick= {viewSotresNearBy}/>
        </main>
      </div>
    </div>
  )
}