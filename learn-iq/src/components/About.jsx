import React from 'react'

export const About = () => {
  return (
    <>
        <div id='about' className='lg:h-screen '>
            <div className='text-white text-center'> 
             <h1 className='text-5xl font-bold my-5 lg:mt-16 lg:text-7xl'>About <span className='text-amber-400'>Us</span></h1>
             <p className='font-medium'>Empowering You Through Knowledge and Skills.</p>
           </div>
            <div className='lg:flex lg:mt-30 lg:mb-52'>
                <div className='text-center'>
                   <img src='/src/assets/books.png' className='min-h-12 min-w-12 md:ml-25 lg:ml-0 lg:h-100 lg:w-600'></img>  
                </div>
                <div>
                    <p className='text-amber-50 font-medium text-center mx-1 lg:pt-14'>The Aptitude Test System is dedicated to providing high-quality, accessibile aptitude assessments to help individuals prepare and improve their congnitive and analytical skills. Our mission is to empower you by offering a range of pratice tests designed to enhance your logical resoning, quantitive aptitude, verbal ability, and general Knowledge...</p>
                    <div className='sm:flex lg:pt-16'>
                        <div className='text-amber-50 font-medium text-center mx-3.5 my-5'>
                            <h1 className='text-amber-400 text-2xl'>Our Mission</h1>
                            <p>To help you succeed by offering comprehensive and effective pratice tests.</p>
                            <button className="relative overflow-hidden  min-h-8 min-w-20 bg-amber-400 text-white rounded mt-5  font-medium transition-colors duration-20  hover:bg-amber-500"> Start Test </button>
                        </div>
                        <div className='text-amber-50 font-medium text-center mx-3.5 my-5'>
                            <h1 className='text-amber-400 text-2xl'>Why Choose Us?</h1>
                            <p>We provides test content that is relevent, up-to-date, and based on best Practices.</p>
                            <button className="relative overflow-hidden  min-h-8 min-w-20 bg-amber-400 text-white rounded my-5  font-medium transition-colors duration-20  hover:bg-amber-500"> Start Test </button>
                        </div>
                    </div>
                </div>
           </div>

        </div>
    </>
  )
  
}
