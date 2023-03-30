import '@/styles/globals.scss'
import { IBM_Plex_Sans } from 'next/font/google' 


const IBMPlex_Sans = IBM_Plex_Sans({
  subsets:['latin'],
  weight:['400','700']
})

export default function App({ Component, pageProps }) {

  return (
    <div className= {IBMPlex_Sans.className}>
      <Component {...pageProps} />
    </div>
    )
}