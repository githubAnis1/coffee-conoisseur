export const fetchedCoffeStores = async () =>{
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
            '10'
        ),
        options
    )
    const data = await response.json()
    return data.addresses
}