import Navbar from "../navbar"
import heroImg from "../images/hero.png"
import featureOne from "../images/feature-1.png"
import featureTwo from "../images/feature-2.png"
import Footer from "../footer";
import { useEffect } from "react";
import useFunctions from "../utils/functions";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Home(){
  const [packages, setPackages] = useState([])
  
  const { getPackageLists } = useFunctions();

  const getAllPackageList = async () => {
    const allPackages = await getPackageLists();
    if (allPackages.length > 0){
      setPackages(allPackages)
    }
  }

  const currentPackageData = !!packages && packages.map((data) => {
    return <>
      <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
        <h3 class="mb-4 text-2xl font-semibold">{data.package_name}</h3>
        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{data.package_desc}</p>
        <div class="flex items-baseline justify-center my-8">
          <span class="mr-2 text-5xl font-extrabold">${data.price}</span>
          <span class="text-gray-500 dark:text-gray-400">/{data.package_name}</span>
        </div>
        
        <ul role="list" class="mb-8 space-y-4 text-left">
          <li class="flex items-center space-x-3">              
            <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span>Individual configuration</span>
          </li>
          <li class="flex items-center space-x-3">              
            <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span>No setup, or hidden fees</span>
          </li>
          <li class="flex items-center space-x-3">              
            <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span>Team size: <span class="font-semibold">1 developer</span></span>
          </li>
          <li class="flex items-center space-x-3">
            <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span>Premium support: <span class="font-semibold">6 months</span></span>
          </li>
          <li class="flex items-center space-x-3">              
            <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span>Free updates: <span class="font-semibold">6 months</span></span>
          </li>
        </ul>
        <Link to={`/sign?price=${data.price}&package=${data.package_name}&qqrv=${data.id}`} class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get started</Link>
      </div>
    </>
  });
  useEffect(() => {
    getAllPackageList()
  },[])

  return(
    <>
    <Navbar/>
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                Building digital products & brands.
              </h1>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={heroImg} alt="hero image"/>
            </div>                
        </div>   
      </section>
      <section class="bg-white dark:bg-gray-900">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Designed for business teams like yours</h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Landwind we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {currentPackageData}
          </div>
        </div>
      </section>
      
      <Footer/>
    </>
  )
}