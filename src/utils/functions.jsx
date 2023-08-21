import useAxios from "../hooks/hook"

const useFunctions = () => {
  const { executeGet, executeReq } = useAxios();

  const getSubscriberPensionDetails = async (param) => {
    const {data} = await executeGet(`subscriber/inheritance?subscriber_id=${param}`)
    if (data.status){
      return {status: data.status, pension_data: data.data, response_message: data.response_message}
    }else{
      return {status: data.status, response_message: data.response_message}
    }
  }

  return { getSubscriberPensionDetails }

}

export default useFunctions