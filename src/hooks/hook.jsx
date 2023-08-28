import { useState } from 'react'
import axios from "axios"

const useAxios = () => {
  let BASE_URL = ""
  if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://api.oneinc.app/v1';
  }else{
    BASE_URL = 'https://api.staging.oneinc.app/v1';
  }

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  /*
  Execute Req
  */

  const executeGet = async (route) => {
    try {
      const res = await axios.get(`${BASE_URL}/${route}`, {headers: {
        Accept: 'application/json',
      }})
      return res
    }
    catch (err) {
      return(err)
    }
  }

  const executeReq = async (route, body) => {
    setIsPending(true)

    try {
      const res = await axios.post(`${BASE_URL}/${route}`, body)
      return res
    }
    catch (err) {
      setError(err)
    }
  }
  /*
  Execute Req
  */

  return { executeReq, executeGet }
}

export default useAxios
