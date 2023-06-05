import { useState } from 'react'
import axios from "axios"

const useGetAxios = () => {
  const BASE_URL = 'http://34.125.122.165:6003';
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  /*
  Execute Req
  */

  const executeGet = async (route) => {
    try {
      const res = await axios.get(`${BASE_URL}/${route}`)
      return res
    }
    catch (err) {
      return(err)
    } finally { return(false) }
  }

  /*
  Execute Req
  */

  return { executeGet }
}

export default useGetAxios