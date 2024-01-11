import { useState } from 'react'
import axios from "axios"

const useAxios = () => {
  let BASE_URL = "https://api.staging.oneinc.app/v1"
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

    try {
      const res = await axios.post(`${BASE_URL}/${route}`, body)
      return res
    }
    catch (err) {
      return(err)
    }
  }
  /*
  Execute Req
  */

  return { executeReq, executeGet }
}

export default useAxios
