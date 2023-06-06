import $ from 'jquery'; 
import {useState, useEffect} from "react"
import { ShowToast } from "../utils/showToast"
// import Select from 'react-select';
import { useLocation } from 'react-router-dom';

import Select, { StylesConfig } from 'react-select';

import makeAnimated from 'react-select/animated';
import useFunctions from "../utils/functions";
import PhoneInput from "react-intl-tel-input";
import Switch from 'react-switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import useEncryption from '../utils/cryptFunctions';

import "react-intl-tel-input/dist/main.css";

const animatedComponents = makeAnimated();

export default function SignUp(){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const price = queryParams.get("price");
  const packageName = queryParams.get("package");
  const pid = queryParams.get("qqrv");

  const [value, setValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [industryValue, setIndustryValue] = useState(null);
  const [sexValue, setSexValue] = useState(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isCityLoading, setIsCityLoading] = useState(false)
  const [pageOne, setPageOne] = useState(true)
  const [pageTwo, setPageTwo] = useState(false)
  const [pageThree, setPageThree] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [accountEnabled, setAccountEnabled] = useState(false)

  const [beneficiaryDetails, setBeneficiaryDetails] = useState([])
  
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [sexOpen, setSexOpen] = useState(false)

  const [industries, setIndustries] = useState([])
  const sex = ['Male','Female', 'Other']

  const industryLoading = industryOpen && industries.length === 0;
  const countryLoading = countryOpen && countries.length === 0;
  const sexLoading = sexOpen && sex.length === 0;
  const loading = open && cities.length === 0;

  const [industry, setIndustry] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ext, setExt] = useState('')
  const [address, setAddress] = useState('')
  const [userChoice, setUserChoice] = useState('')
  const [userCityChoice, setUserCityChoice] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)


  const [nextKinDob, setNextKinDob] = useState('')
  const [genderStatus, setGenderStatus] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState('')
  const [frequency, setFrequency] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { getAllCountries, getCountryCities, checkUsername, submitCompanySubscription, getAllIndustries } = useFunctions();
  

  const options = [
    { value: '', label: '....Loading' },
  ]

  const handleAccountChange = (checked) => {
    setAccountEnabled(checked)
  }

  const handleChange = (checked) => {
    setEnabled(checked);
  }

  const checkUsename = async (username) => {
    
    let params = { "username": username, "src":"PTL" }
    const {resp_code, data} = await checkUsername(params)
    if (resp_code === '171'){
      return {"username_resp_code": true, "username_resp_desc": "Username Available"}
    }else{
      return {"username_resp_code": false, "username_resp_desc": "Username is already taken"}
    }
  }

  const changeUsername = async (e) => {
    setUsername(e.target.value)
    let {username_resp_code, username_resp_desc} = await checkUsename(e.target.value)
    console.log("USERNAME CODE " + username_resp_code)
    if (username_resp_code){
      setError('')
      setIsUsernameAvailable(true)
    }else{
      setError(username_resp_desc)
      setIsUsernameAvailable(false)
      ShowToast('error', username_resp_desc)
    }
  }

  const handlePhoneChange = (status, phoneNumber, country) => {
    setExt(country.dialCode)
    setPhoneNumber(phoneNumber)
  };

  const handleUserPhoneChange = (status, phoneNumber, country) => {
    setExt(country.dialCode)
    setUserPhone(phoneNumber)
  };

  const getCountryData = async () => {
    
    const countryData = [];
    const allCountries = await getAllCountries();
    if (allCountries.length > 0){
      allCountries.forEach(element => {
        countryData.push(element.country_name)
      });
      setIsLoading(false)
      countryData.push('Global')
      setValue('')
      setCountries(countryData.reverse())
    }
  }

  const getAllCountryCities = async (label) =>{
    const cityData = [];

    if (label === "Global"){
      setIsCityLoading(false)
      cityData.push('Global')
      setCities(cityData)
    }else{
      const {resp_code, data} = await getCountryCities(encodeURIComponent(label))
      if (data.length > 0){
        data.forEach(element => {
          cityData.push(element.city)
        });
        setIsCityLoading(false)
        setCities(cityData)
      }
    }
  }

  const getIndustries = async () => {
    const industryData = []

    const allIndustries = await getAllIndustries();
    if (allIndustries.length > 0){
      allIndustries.forEach(element => {
        industryData.push({value: element.id, label: element.name})
      });
      setIsLoading(false)
      setIndustries(industryData)
    }
  }

  useEffect(()=>{
    setIsLoading(true)
    getCountryData()
    getIndustries()
  },[]);

  const changeUserChoice = (choice) => {
    setIsCityLoading(true)
    setValue('')
    setCities([])
    setCountryValue(choice)
    getAllCountryCities(choice)
    setUserChoice(choice)
  }

  const changeCompanyName = e => setCompanyName(e.target.value)
  const changeEmail = e => setEmail(e.target.value)
  const changeUserFirstName = e => setUserFirstName(e.target.value)
  const changeUserLastName = e => setUserLastName(e.target.value)

  const changePassword = e => setPassword(e.target.value)
  const changeAddress = e => setAddress(e.target.value)
  const changeUserEmail = e => setUserEmail(e.target.value)

  const compareStrings = (str1, str2) => {
    return str1.localeCompare(str2);
  }

  const changeConfirmPassword = e => {
    setConfirmPassword(e.target.value)
    var result = compareStrings(password, e.target.value)
    if (result === 0) {
      setPasswordMismatch('')
    } else if (result < 0) {
      setPasswordMismatch("Passwords do not match")
    } else {
      setPasswordMismatch("Passwords do not match")
    }
  }

  const createAccount = async () => {
    setIsLoading(true)

    if (passwordMismatch !== ''){
      ShowToast('error', "Password does not match")
      return;
    }

    let is_global = false

    if (countryValue === 'Global'){
      is_global = true
    }

    const params = {
      "company_name": companyName, 
      "is_global": is_global, 
      "country": is_global ? null : countryValue,
      "city": is_global ? null : value, 
      "industry_id": "1",
      "company_email": email,
      "company_phone": phoneNumber, 
      "company_address": address, 
      "can_login": accountEnabled, 
      "subscription_package": pid,
      "subscription_auto_renew": enabled, 
      "user_phone_number": !accountEnabled ? null : userPhone, 
      "user_first_name": !accountEnabled ? null : userFirstName, 
      "user_last_name": !accountEnabled ? null : userLastName, 
      "user_sex": !accountEnabled ? null : sexValue, 
      "user_email": !accountEnabled ? null : userEmail, 
      "password": !accountEnabled ? null : password , 
      "username": !accountEnabled ? null : username, 
      "src": "PTL",
      "enrollment_type": "S"
    }

    const {resp_code, checkout_url, response_message} = await submitCompanySubscription(params);
    if (resp_code === '000'){
      ShowToast('success', "Records successfully created")
      setTimeout(function(){
        window.open(checkout_url, '_blank');
      }, 1000);
      setTimeout(function(){
        window.location.href = '/'
      }, 3000);
    }else{
      ShowToast('error', response_message)      
    }
  }

  const changePageOne = (page) =>{
    switch(page) {
      case "1":
        setPageOne(true)
        setPageTwo(false)
        setPageThree(false)
        break;
      case "2":
        if (companyName === "" || industryValue === null ||countryValue === null || value === null || phoneNumber === "" || address === "" || email === ""){
          ShowToast("error", "Please fill all necessary fields on Company Details Page")
          break;
        }
        setPageOne(false)
        setPageTwo(true)
        setPageThree(false)
        break;
      case "3":
        // if (firstName === "" || lastName === "" || dateOfBirth === "" || userPhone === ""){
        //   ShowToast("error", "Please fill all necessary fields on Personal Information Page")
        //   break;
        // }

        setPageOne(false)
        setPageTwo(false)
        setPageThree(true)
        break;
      default:
        setPageOne(true)
        setPageTwo(false)
        setPageThree(false)
    }
  }

  return(
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Designed for business teams like yours</h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Landwind we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <p class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{packageName} Subscription @ ${price}</p>
          </div>
         
          <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            {/* <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">A. Company Details</h2> */}
            <div className='lg:grid lg:grid-cols-2 mt-4'>
              <div>
                { pageOne? 
                  <h1 className='page-heading page-heading-selected text-center cursor-pointer'>A. Company Details & Subscription</h1>
                  :
                  <h1 className='page-heading text-center cursor-pointer' onClick={()=>changePageOne("1")}>A. Company Details & Subscription</h1>
                }
              </div>
              <div>
                { pageTwo ? 
                  <h1 className='page-heading page-heading-selected text-center cursor-pointer'>B. User login details</h1>
                  :
                  <h1 className='page-heading text-center cursor-pointer' onClick={()=>changePageOne("2")}>B. User login details</h1>
                }
              </div>
            </div>
          </div>
          <div class="space-y-8 border border-gray-100 shadow lg:mb-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div className="grid main-right-padding">              
              { pageOne? 
                <div className="lg:grid lg:grid-cols-3">
                  <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label">Company name</p>
                          <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeCompanyName} value={companyName} placeholder="Company name" type="text"/>
                        </div>
                      </li>
                    </ul>
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label mb-4">Country</p>
                          <Autocomplete
                            options={countries}
                            getOptionLabel={option => option}
                            open={countryOpen}
                            onOpen={() => {
                              setCountryOpen(true);
                            }}
                            onClose={() => {
                              setCountryOpen(false);
                            }}
                            value={countryValue}
                            sx={{ width: '300px' }}
                            loading={countryLoading}
                            onChange={(event, newValue) => {
                              changeUserChoice(newValue);
                            }}
                            renderInput={params => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </div>
                      </li>
                    </ul>
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label mb-4">City</p>
                          
                          <Autocomplete
                            options={cities}
                            getOptionLabel={option => option}
                            open={open}
                            onOpen={() => {
                              setOpen(true);
                            }}
                            onClose={() => {
                              setOpen(false);
                            }}
                            value={value}
                            sx={{ width: '300px' }}
                            loading={loading}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={params => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label mb-4">Industry</p>
                          <Autocomplete
                            options={industries}
                            getOptionLabel={option => option.label}
                            open={industryOpen}
                            onOpen={() => {
                              setIndustryOpen(true);
                            }}
                            onClose={() => {
                              setIndustryOpen(false);
                            }}
                            value={industryValue}
                            sx={{ width: '300px' }}
                            loading={industryLoading}
                            onChange={(event, newValue) => {
                              setIndustryValue(newValue);
                            }}
                            renderInput={params => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </div>
                      </li>
                    </ul>
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label">Email</p>
                          <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeEmail} value={email} placeholder="Email" type="text"/>
                        </div>
                      </li>
                    </ul>
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label mb-4">Auto renewal?</p>
                          <Switch onChange={handleChange} checked={enabled} />                          
                        </div>
                      </li>
                    </ul>
                    
                  </div>
                  <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        
                        <div className="flex flex-col">
                          <p className="get-started-text-label mb-4">Phone</p>
                          <PhoneInput
                            containerClassName="intl-tel-input"
                            inputClassName="form-control"
                            type="tel"
                            defaultCountry="us"
                            onPhoneNumberChange={handlePhoneChange}
                            value={phoneNumber}
                          />
                            {/* <input className="get-started-input mt-4" onChange={changePhone} value={phone} placeholder="Phone" type="text"/> */}
                        </div>
                      </li>
                    </ul>
                    <ul role="list" class="mb-8 space-y-4 text-left">
                      <li class="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <p className="get-started-text-label">Address</p>
                          <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeAddress} value={address} placeholder="Address" type="text"/>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              :
              null
              }

              { pageTwo? 
                <>
                  <div className="lg:grid lg:grid-cols-1">
                    <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-2 dark:bg-gray-800 dark:text-white">
                      <ul role="list" class="mb-8 space-y-4 text-left">
                        <li class="flex items-center space-x-3">
                          <div className="flex flex-col">
                            <p className="get-started-text-label">Do you wish to create a user account?</p>
                            <Switch onChange={handleAccountChange} checked={accountEnabled} />  
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-3">
                    {accountEnabled ? 
                      <>
                        <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">User's first name</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeUserFirstName} value={userFirstName} placeholder="User's name" type="text"/>
                              </div>
                            </li>
                          </ul>
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">User's last name</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeUserLastName} value={userLastName} placeholder="User's name" type="text"/>
                              </div>
                            </li>
                          </ul>
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">User's email</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeUserEmail} value={userEmail} placeholder="Email" type="text"/>
                              </div>
                            </li>
                          </ul>                          
                        </div>
                        <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label mb-4">Gender</p>
                                <Autocomplete
                                  options={sex}
                                  getOptionLabel={option => option}
                                  open={sexOpen}
                                  onOpen={() => {
                                    setSexOpen(true);
                                  }}
                                  onClose={() => {
                                    setSexOpen(false);
                                  }}
                                  value={sexValue}
                                  sx={{ width: '300px' }}
                                  loading={sexLoading}
                                  onChange={(event, newValue) => {
                                    setSexValue(newValue);
                                  }}
                                  renderInput={params => (
                                    <TextField {...params} variant="outlined" />
                                  )}
                                />
                              </div>
                            </li>
                          </ul>
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">Password</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changePassword} value={password} placeholder="Password" type="password"/>
                              </div>
                            </li>
                          </ul>
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">Confirm Password</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeConfirmPassword} value={confirmPassword} placeholder="Confirm Password" type="password"/>
                                <h1 className='phone-number-instruction'>{passwordMismatch}</h1>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="max-w-lg p-6 mx-auto text-center text-gray-900 bg-white rounded-lg xl:p-8 dark:bg-gray-800 dark:text-white">
                         
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">User's phone number</p>
                                <PhoneInput
                                  containerClassName="intl-tel-input"
                                  inputClassName="form-control"
                                  type="tel"
                                  defaultCountry="us"
                                  onPhoneNumberChange={handleUserPhoneChange}
                                  value={userPhone}
                                />                              
                              </div>
                            </li>
                          </ul>
                          <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3">
                              <div className="flex flex-col">
                                <p className="get-started-text-label">Username</p>
                                <input className="get-started-input mt-4 outline-offset-1 outline-blue-500" onChange={changeUsername} value={username} placeholder="Username" type="text"/>
                                <h1 className='phone-number-instruction'>{error}</h1>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </>
                      :
                      null
                    }
                  </div>
                </>
              :
              null
              }
            </div>
            
          </div>
          <div className='flex justify-center mt-12'>
            { pageOne? 
              <button onClick={()=>changePageOne("2")} className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12'>
                <a href="#" class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Next (1/2)</a>
              </button>
            : null
            }
            { pageTwo? 
              accountEnabled ? 
                <>
                  {isUsernameAvailable ?
                    <button onClick={createAccount} className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12'>
                      <p class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Submit Details</p>
                    </button>
                    :
                    <button className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12 lg:disabled'>
                      <a href="#" class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Submit Details</a>
                    </button>
                  }
                </>
                : 
                <button onClick={createAccount} className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12'>
                  <a href="#" class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Submit Details</a>
                </button>
              : null
            }
          </div> 
        </div>
      </section>
    </>
  )
}