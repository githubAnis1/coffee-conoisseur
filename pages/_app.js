import '@/styles/globals.scss'
import { IBM_Plex_Sans } from 'next/font/google' 
import { createContext,useReducer } from 'react'
// google Fonts
const IBMPlex_Sans = IBM_Plex_Sans({
  subsets:['latin'],
  weight:['400','700']
})
//create context for Latlong and coffees Stores
export const StoreContext = createContext({});
//useReducer
export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
//provider
const StoreProvider = ({children})=>{
  const initialeState = {
    latlong:"",
    coffeeStores:[]
  }
  const [state, dispatch] = useReducer(storeReducer, initialeState);
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export default function App({ Component, pageProps }) {

  return (
    <div className = {IBMPlex_Sans.className}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
    )
}