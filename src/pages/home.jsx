import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useEffect } from "react";
import useFunctions from "../utils/functions";
import PensionImg from '../images/pension_icon.svg'
import ThumbsImg from '../images/thumbs.png'
import CertImg from '../images/cert.png'

import { useParams } from "react-router-dom";

export default function Home(){
  const [noData, setNoData] = useState(true)
  const [subscriberData, setSubscriberData] = useState([])
  const [subNextKin, setSubNextKin] = useState({})
  const [subDetails, setSubDetails] = useState({})
  const [subLegalDetails, setSubLegalDetails] = useState({})
  const [subInfo, setSubInfo] = useState({})

  const { getSubscriberPensionDetails } = useFunctions();
  const { subscriber_id } = useParams();

  const getPensionDetails = async () => {
    const {status, pension_data} = await getSubscriberPensionDetails(subscriber_id);

    if (status){
      console.log("SUBS " + JSON.stringify(pension_data['subscriber']))
      if (pension_data['beneficiaries'].length > 0){
        setSubscriberData(pension_data['beneficiaries'])
        setSubNextKin(pension_data['subscriber']['next_of_kin'])
        setSubDetails(pension_data['subscriber'])
        setSubInfo(pension_data['subscriber']['subscriber_info'])
        setSubLegalDetails(pension_data['subscriber']['subscriber_legal'])
  
        // generatePDF()
      }
    }else{
      setNoData(false)
    }
  }

  useEffect(() => {
    getPensionDetails()
  },[])

  const currentPensionData = !!subscriberData && subscriberData.map((data, index) => {
    return <>
      <tr key={index} className="mb-4">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">{index + 1}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{data.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{data.relationship}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{data.allocation} %</td>
      </tr>
    </>
  });

  const pdfButtonRef = useRef(null);

  const handleGeneratePDF = () => {
    generatePDF();
  };

  const generatePDF = () => {
    const element = document.getElementById('pension-pdf-id');
  
    const opt = {
      margin: [0, 0, 0, 0],
      filename: 'declaration-certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf().set(opt).from(element).save();
  };

  return(
    <>
      { noData ? 
        <>
          <button className='fixed flex flex-row button-margin' ref={pdfButtonRef} onClick={handleGeneratePDF}>
            <p className='p-margin underline'>Download</p> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          <div id='pension-pdf-id'>
            <section class="bg-white section-margin">
              <div class="flex flex-row justify-center px-4 pt-12">
                <div class="justify-center flex flex-row space-x-5">
                  <img className="icon-width" src={ThumbsImg}/>
                  <hr class="vertical-hr"/>
                  <img className="icon-width ml-4" src={PensionImg}/>
                </div> 
                <div class="justify-center flex flex-col text-margin">
                  <h1 class="left-center heading-color text-2xl font-extrabold leading-none tracking-tight md:text-3xl xl:text-3xl">
                    One Plan
                  </h1>
                  <p class="mb-5 font-light heading-color text-gray-500 sm:text-xl dark:text-gray-400">Pension Scheme</p>
                </div>              
              </div>   
            </section>
            <div class="grid max-w-screen-xl justify-center py-8 mx-auto">
              <div class="max-w-screen-md mx-auto text-center">
                <h2 class="text-xl font-extrabold tracking-tight text-bg-design ">DECLARATION CERTIFICATE</h2>
              </div>
            </div>
            <section class="bg-white">
              <div class="max-w-screen-xl mx-auto">
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div class="max-w-screen-md mx-auto mb-8 left-center lg:mb-12">
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    I. I hereby declare that One Plan Pension Scheme pays my death benefit resulting from my death to the nominated beneficiaries.
                    </p>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    II. I understand that One Plan Pension Scheme will take all possible steps to make payments to the nominated beneficiaries
                    </p>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    III. I declare and certify that to the best of my knowledge and belief, the information below is correct and complete.
                    </p>
                  </div>
                  <div className='max-w-screen-md mx-auto mb-4'>
                    <div class="max-w-screen-md mx-auto mb-4 text-center">
                      <h2 class="text-xl font-extrabold tracking-tight text-bg-design">
                        DETAILS OF SCHEME MEMBER
                      </h2>
                    </div>
                    <div class="max-w-screen-xl px-4 mx-auto">
                      <div class="flex flex-col max-w-screen-md px-4 mx-auto">
                        <div class="-m-1.5 overflow-x-auto">
                          <div class="max-w-screen-md inline-block table-w">
                            <div>
                              <table class="max-w-screen-md divide-y divide-gray-200 dark:divide-gray-700">
                                <tbody class="divide-y divide-gray-200 space-y-4">
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Full Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{subDetails.full_name}</td>
                                  </tr>
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Date of Birth</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{subInfo.dob}</td>
                                  </tr>
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Ghana Card ID Number</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">GHA-{subLegalDetails.id_number}</td>
                                  </tr>
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Telephone Number</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{subDetails.phone}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='max-w-screen-md mx-auto mb-4 mt-alt'>
                    <div class="max-w-screen-md mx-auto mb-4 text-center">
                      <h2 class="text-xl font-extrabold tracking-tight text-bg-design text-gray-900">
                        DETAILS OF NEXT OF KIN
                      </h2>
                    </div>
                    <div class="max-w-screen-xl px-4 mx-auto mb-4">
                      <div class="flex flex-col max-w-screen-md px-4 mx-auto">
                        <div class="-m-1.5 overflow-x-auto">
                          <div class="max-w-screen-md inline-block table-w">
                            <div>
                              <table class="max-w-screen-md divide-y divide-gray-200 dark:divide-gray-700">
                                <tbody class="divide-y divide-gray-200 space-y-4">
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Full Name</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{subNextKin.name}</td>
                                  </tr>
                                  <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style">Telephone Number</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style">{subNextKin.phone_number}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div class="max-w-screen-xl px-4 mx-auto mb-4 mt-alt">
                    <div class="max-w-screen-md mx-auto text-center">
                      <h2 class="text-xl font-extrabold tracking-tight text-bg-design text-gray-900">
                        DETAILS OF NOMINATED BENEFICIARIES
                      </h2>
                    </div>
                    <div class="flex flex-col max-w-screen-md px-4 mx-auto">
                      <div class="-m-1.5 overflow-x-auto">
                        <div class="max-w-screen-md inline-block table-w">
                          <div>
                            <table class="max-w-screen-md divide-y divide-gray-200 dark:divide-gray-700">
                              <thead>
                                <tr className='mb-4'>
                                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium table-text-style">No</th>
                                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium table-text-style">Name</th>
                                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium table-text-style">Relationship to Subscriber</th>
                                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium table-text-style">Benefit Percentage</th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-gray-200 space-y-4">
                                {currentPensionData}
                                <tr>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium table-text-style"></td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style"></td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style"></td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style table-text-style-alt">100 %</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="max-w-screen-md mx-auto lg:mb-24 left-center">
                    <p class="mb-5 font-light text-gray-500 sm:text-xl lg:mb-12">
                    IV. I am duly informed and to my full understanding that, I will be liable to prosecution for any false declaration herein or hereafter made to the Scheme.
                    </p>
                  </div>
                  <div class="max-w-screen-md signature-margin mx-auto lg:mt-12 grid lg:grid-cols-3 space-x-5">
                    <div className="flex flex-col">
                      <hr></hr>
                      <p className="text-center">Signature</p>
                    </div>
                    <div className="flex flex-col">
                      <hr></hr>
                      <p className="text-center">Date</p>
                    </div>
                  </div>
                
                  <div class="max-w-screen-md mx-auto mb-4 justify-end lg:mb-4 ml-4 flex flex-row">
                    <div className="grid place-items-center">
                      <img className="cert-design" src={CertImg}/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </> : 
        <div className='no-record-position text-xl font-extrabold tracking-tight text-bg-design'>NO DATA FOUND</div>
      }
    </>
  )
}