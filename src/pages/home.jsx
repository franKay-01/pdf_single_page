import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useEffect } from "react";
import useFunctions from "../utils/functions";
import CertImg from '../images/cert.png'
import ArrowImg from '../images/gif/arrow.gif'
import DeclarationTitleImg from '../images/declaration_title.png'
import MemberTitleImg from '../images/member_title.png'
import BeneficiariesTitleImg from '../images/beneficiaries_title.png'
import KinTitleImg from '../images/kin_title.png'
import LogoTitle from '../images/logo_title.png'
import PdfLoader from '../images/pdf_loader.gif'

import { useParams } from "react-router-dom";

export default function Home(){
  const [isLoading, setIsLoading] = useState(true)
  const [noDisplay, setNoDisplay] = useState(true)
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
      if (pension_data['beneficiaries'].length > 0){
        setSubscriberData(pension_data['beneficiaries'])
        setSubNextKin(pension_data['subscriber']['next_of_kin'])
        setSubDetails(pension_data['subscriber'])
        setSubInfo(pension_data['subscriber']['subscriber_info'])
        setSubLegalDetails(pension_data['subscriber']['subscriber_legal'])

        setIsLoading(false)
      }
    }else{
      setIsLoading(false)
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

  const generatePDF = () => {
    const element = document.getElementById('pension-pdf-id');
    const opt = {
      margin: [10, 20, 0, 20],
      filename: 'declaration-certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 6 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf().set(opt).from(element).save();
  };

  return(
    <>
      { isLoading ? 
        <div className='grid justify-center items-center main-d-height'>
          <img src={PdfLoader}/>
        </div>
      :
        noData ? 
          <>
            <div className='grid justify-center items-center main-d-height'>
              <div>
                <img className='header-img-width' src={LogoTitle} />
              </div>  
              <div className='flex flex-col space-y-12 justify-center mb-12'>
                <h1 className='text-center uppercase'>click <b>“download”</b> to get the pdf</h1>
                <button className='pdf-download-button' onClick={generatePDF}>
                  <h1 className='pdf-download-button-text'>Download</h1>
                </button>
              </div> 
              <div className='flex flex-col space-y-2 justify-center'>
                <h1 className='text-center uppercase'><b>preview below</b></h1>

                <div className='grid grid-row-2 justify-center'>
                  <img src={ArrowImg} className="gif-position rotate-180" alt="arrow-down" />
                </div>
              </div>              
            </div>
           
            <div id='pension-pdf-id' className='p-10 collapse'>
              <section class="bg-white section-margin">
                <div class="flex justify-center px-4 pt-12">
                  <img className='header-img-width' src={LogoTitle} />
                </div>   
              </section>
              <div class="grid max-w-screen-xl justify-center py-8 mx-auto">
                <div class="max-w-screen-md mx-auto text-center">
                  <img className='header-img-width' src={DeclarationTitleImg}/>
                </div>
              </div>
              <section class="bg-white">
                <div class="max-w-screen-xl mx-auto">
                  <div style={{ pageBreakInside: 'avoid' }}>
                    <div class="max-w-screen-md mx-auto mb-8 left-center lg:mb-12">
                      <p class="flex flex-row sm:space-x-4 mb-5 font-light text-gray-500 sm:text-xl">
                        <p>I.</p>
                        <p>I hereby declare that One Plan Pension Scheme pays my death benefit resulting from my death to the nominated beneficiaries.</p>
                      </p>
                      <p class="flex flex-row sm:space-x-4 mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                      <p>II.</p>
                      <p>I understand that One Plan Pension Scheme will take all possible steps to make payments to the nominated beneficiaries</p>
                      </p>
                      <p class="flex flex-row sm:space-x-4 mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                      <p>III.</p>
                      <p>I declare and certify that to the best of my knowledge and belief, the information below is correct and complete.</p>
                      </p>
                    </div>
                    <div className='max-w-screen-md mx-auto mb-4'>
                      <div class="max-w-screen-md mx-auto mb-4 text-center">
                        <img className='header-img-width-alt-2' src={MemberTitleImg}/>
                      </div>
                      <div class="max-w-screen-xl mx-auto">
                        <div class="flex flex-col max-w-screen-md mx-auto">
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
                        <img className='header-img-width-alt-1' src={KinTitleImg}/>
                      </div>
                      <div class="max-w-screen-xl mx-auto mb-4">
                        <div class="flex flex-col max-w-screen-md mx-auto">
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
                    <div class="max-w-screen-xl mx-auto mb-4 mt-alt">
                      <div class="max-w-screen-md mx-auto text-center">
                        <img className='header-img-width' src={BeneficiariesTitleImg}/>
                      </div>
                      <div class="flex flex-col max-w-screen-md mx-auto">
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
                                    <td class="px-6 py-4 whitespace-nowrap text-sm table-text-style table-text-style-alt">100.00 %</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="max-w-screen-md mx-auto lg:mb-24 left-center">
                      <p class="flex flex-row sm:space-x-4 mb-5 font-light text-gray-500 sm:text-xl lg:mb-12">
                      <p>IV.</p>
                      <p>I am duly informed and to my full understanding that, I will be liable to prosecution for any false declaration herein or hereafter made to the Scheme.</p>
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