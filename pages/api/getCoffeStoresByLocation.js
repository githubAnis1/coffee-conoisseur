// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchedCoffeStores } from "@/lib/coffeeStores";

const getCoffeStoresByLocation = async (req, res) =>{
  try {
    const {latlong} = req.query
    const response = await fetchedCoffeStores(latlong)
    res.status(200)
    res.json(response)
    console.log(response);
  } catch (error) {
    console.log("there is an error:",error);
    res.status(500)
    res.json({message:'oh no somethig went wrong'})
  }
}

export default getCoffeStoresByLocation;