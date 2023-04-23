import React from 'react'
import MediaQuery from 'react-responsive'
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';
import ProductList from '../Components/Products/ProductList';

import { useState, useEffect } from 'react';
import { useStore } from '../Store';


const fetchUrl = `${process.env.REACT_APP_API_URL}`;


const FAQsPage = () => {
    const [FAQs, setFAQs] = useState([]);
    const navigate = useNavigate()

  
  
    useEffect(() => {
        setFAQs([
            {
                faqId: 1, 
                question: `All of my friends are riding on the same bus but it is now sold out - is there any way  to get an extra ticket? `,
                answer: `Unfortunately, once a bus has sold out that means that we have reached capacity and cannot add any more tickets to that particular bus. However, sometimes we get cancellations and one or two tickets might open up. Keep an eye out on our website and you might be able to snag one and ride with your friends!  If you want, you can also email us at reservations@bustoshow.org, and sometimes we are able to notify people when more spots are released.`
            },
            {
                faqId: 2,
                question: `Can I leave an item on the bus? `,
                answer: `If you decide to leave a personal belonging on the bus, please keep in mind that we are not responsible for any lost or stolen items, as our drivers do not necessarily stay with the buses for the entirety of the show.`
            },
            {
                faqId: 3,
                question: `I lost an item on your bus - do you have a lost and found?`,
                answer: `Yes! Please fill out our Lost and Found Form or email reservations@bustoshow.org. If your item is found we will email you to let you know and set up a time to get it back to you. We will keep looking for your item for 30 days after filling out the form. Once the 30 days is up if we haven't found your item we will reach out to let you know that we have stopped searching for your item. `
            },
            {
                faqId: 4,
                question: ` Do you sell  one-way tickets?`,
                answer: `All of our tickets are round trip. However, when you purchase a ticket, you don't have to take the bus both ways - we save a spot for you on the bus there and back. You can find our buses at the end of the night in the Lower South Lot 2 and just make sure to have a photo ID that shows your birthday, and touch base with your driver who will get you all checked in and on the right bus!`
            },
            {
                faqId: 5,
                question: `Does Bus to Show have an age limit?`,
                answer: `Our buses are 18+. However, we will let a minor ride the bus as long as we receive written parental permission emailed to reservations@bustoshow.org with Subject: Guardian permission for (YOUR NAME) to RIDE BTS on (EVENT DATE), And the following text in the body: I, guardian/parent name, the parent/legal guardian of your child’s name, release Bus to Show, inc. and all its employees, partners, and affiliates of any liability for any incident that may occur as a direct or indirect result of this trip. Please also include a copy of the parent/legal guardian driver license in the email and bring a copy of the email with you to check-in.`
            },
            {
                faqId: 6,
                question: `Do you allow alcohol on your buses?`,
                answer: `Yes, we do allow alcohol on our buses. Everyone drinking must be over the age of 21, and we just ask that you do not bring glass, that you remain coherent and considerate, and that you clean up your empty containers before disembarking.`
            }
         ])

  
    }, []);
  
    return (
      <div>
        <div className="row p-2">
                <div className='col-12 text-center'>
                  <button type="button" className="btn detail-btn mr-2" onClick={()=>{navigate('/')}}>
                    <strong>Back to Dashboard</strong>
                  </button>
                </div>
              </div>
      <MediaQuery minWidth={800}>
        <div className="w-75 mx-auto">
          <div className="container-border-orange m-4 p-4">
              <div className='col-12 text-center'>
                <h3 className="bts-orange-bg">FAQs</h3>
                <div >
                    {FAQs.map((faq, i) =>
                    <div className="row bg-light p-4 m-4" key={i}>
                        <div className="row p-4 m-4">
                            <h4>Q: {faq.question}</h4>
                            <p>A: {faq.answer}</p>
                        </div>
                    </div>
                    )}
                </div>
              </div>
          </div>
      </div>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <div className="container-border-orange m-4 p-4">
            <div className='col-12 text-center'>
            <h3 className="bts-orange-bg">FAQs</h3>
            <h3 className="bts-orange-bg">FAQs</h3>
                <div >
                    {FAQs.map((faq, i) =>
                    <div className="row bg-light p-4 m-4" key={i}>
                        <div className="row p-4 m-4">
                            <h4>Q: {faq.question}</h4>
                            <p>A: {faq.answer}</p>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
      </MediaQuery>
  </div>
  
    );
  }
  
  
  export default FAQsPage