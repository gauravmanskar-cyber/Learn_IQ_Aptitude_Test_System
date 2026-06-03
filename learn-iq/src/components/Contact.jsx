import React from 'react'


export const Contact = () => {
  return (
    <>

    <div id='contact' className='h-screen '>
        <div className='text-amber-50 text-center'>
                <h1 className='text-5xl font-bold my-5 lg:mt-16 lg:text-7xl'>Contact <span className='text-amber-400'>Us</span></h1>
                <p className='font-medium'>We'd love to hear from you!</p>
        </div>
        <div className='sm:flex sm:mt-15'>
            <div className='text-amber-50 sm:flex-1'>
                <div className='flex border-2 rounded  mx-12 bg-amber-50 text-black my-7'>
                    <div className='ml-10 py-10'>
                         <img src='/src/assets/Email.gif' className='max-h-7 max-w-7 mt-2'></img>
                          <img src='/src/assets/phone.png' className='max-h-7 max-w-7 mt-10'></img>
                           <img src='/src/assets/location.gif' className='max-h-7 max-w-7 mt-10'></img>

                    </div>
                    <div className='ml-5 py-10'>
                        <h4 className='font-bold'>Email</h4>
                        <p className='font-medium'>abc@gmail.com</p>

                        <h4 className='pt-5 font-bold'>Phone</h4>
                        <p className='font-medium'>+91 9356836414</p>

                        <h4 className='pt-5 font-bold'>Address</h4>
                        <p className='font-medium'>Khamgaon, Buldhana</p>                    
                    </div>
                </div>

            </div>
            <div className='sm:flex-1'>
                <div className='border-2 rounded  mx-12 bg-amber-50 text-black my-7 px-5'>
                    <div className='my-5'>
                        <h1 className='font-bold '>Send US a Message</h1>
                        <input placeholder=' Your Name'className='border rounded min-w-50  mt-3 lg:w-100'></input><br></br>
                        <input placeholder=' Your Email' className='border rounded min-w-50 mt-4 lg:w-100'></input><br></br>
                        <textarea placeholder=' Your Massage' className='border rounded min-w-50 mt-4 min-h-20 lg:w-100'></textarea><br></br>
                        <button className="relative overflow-hidden  min-h-8 min-w-20 bg-amber-400 text-white rounded mt-5  font-medium transition-colors duration-20  hover:bg-amber-500 px-3">Send Message</button>
                     </div>
                     <div>
                        <h1 className='font-bold'>Follow Us</h1>
                     </div>
                     <div className='flex space-x-3 my-3 max-h-7 max-w-7'>
                        <img src='/src/assets/facebook.gif'></img>
                        <img src='/src/assets/twitter.gif'></img>
                        <img src='/src/assets/linkdin.gif'></img>
                     </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
