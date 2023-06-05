import useAxios from "../hooks/hook"

const useFunctions = () => {
  const { executeGet, executeReq } = useAxios();

  const getAllCountries = async () => {
    const { data } = await executeGet('get_country_list');
    return data.response_data
  }

  const getCountryCities = async (param) => {
    let route = `get_city_list?country=${param}`
    const { data } = await executeGet(route);
    return {resp_code: data.response_code, data: data.response_data}
  }

  const getAllIndustries = async () => {
    const { data } = await executeGet('admin_get_industry_list');
    if (data.response_code === "027"){
      return []
    }
    return data.response_data
  }

  const getPackageLists = async () => {
    const { data } = await executeGet('admin_get_company_subscription_packages_list');
    if (data.response_code === "027"){
      return []
    }
    return data.response_data
  }

  const submitCompanySubscription = async (param) => {
    const {data} = await executeReq('submit_company_subscription', param)
    return {resp_code: data.response_code, checkout_url: data.checkout_url}
  }

  const checkUsername = async (param) => {
    const {data} = await executeReq('check_username_availability', param)
    return {resp_code: data.response_code, data: data.response_message}
  }

  return { getAllCountries, getCountryCities, checkUsername, submitCompanySubscription, getAllIndustries,
    getPackageLists}

}

export default useFunctions