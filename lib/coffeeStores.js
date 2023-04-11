import { createApi } from 'unsplash-js';
// npm i --save unsplash-js
const unsplash = createApi({
  accessKey: process.env.Unsplash_Api_key,
});
// UNSPLASH API
const getCoffeeStoresPhotos = async ()=> {
    const photosData = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 11,
    });
    const photos = photosData.response.results
    return photos.map((result) => result.urls.regular)
}

export const fetchedCoffeStores = async () => {
    // get images from the api
    const photos = await getCoffeeStoresPhotos()
    // RADAR API
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.radar_Api_key,
        },
        };
    const fetchUrlCoffeeStores = (placeLabel,near,limit) => {
        return `https://api.radar.io/v1/search/autocomplete?query=${placeLabel}&near=${near}&limit=${limit}`
    }
    const response = await fetch(
        fetchUrlCoffeeStores(
            'coffee',
            '40.70390%2C-73.98670',
            '11',
        ),
        options
    )
    const data = await response.json()

    return data.addresses.map((addresse,index) => {
        return {
            id: addresse.number,
            name: addresse.placeLabel,
            addresse: addresse.formattedAddress,
            neighborhood:addresse.neighborhood,
            imgUrl: photos[index],//make sure perPage = limit
        }
    })
}

//  the idea here is fetchedCoffeStores() is the main exported 
//  constain two fetch function {photos,fetchUrlCoffeeStores}
//  {photos} for images and {fetchUrlCoffeeStores} for addesses
//  fetchedCoffeStores() return a addresses list since (imgUrl) created and associated with its address using [index]