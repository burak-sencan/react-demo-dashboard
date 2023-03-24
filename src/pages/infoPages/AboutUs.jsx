import React, { useEffect } from 'react'
import Footer from '../../components/Footer'

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="">
      <div className="mx-auto flex w-2/3 flex-col items-center gap-16  py-8 lg:p-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900  dark:text-light-50 sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            We are a team of passionate individuals who are dedicated to
            providing the best products and services to our customers.
          </p>
        </div>
        <div className="mt-12">
          <h2 className="text-lg  font-medium leading-6 text-gray-900 dark:text-light-50">
            Our Story
          </h2>
          <div className="mt-3 text-gray-500">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              euismod convallis massa, et consequat felis ullamcorper in. Fusce
              vel leo sit amet tellus congue tristique eu vel massa.
            </p>
            <p className="mt-2">
              Pellentesque mattis risus at risus maximus, quis eleifend nibh
              vestibulum. Etiam a semper nisl. Suspendisse potenti. Nulla
              euismod erat vel risus semper volutpat. Nulla facilisi.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg  font-medium leading-6 text-gray-900 dark:text-light-50">
            Our Story
          </h2>
          <div className="mt-3 text-gray-500">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              euismod convallis massa, et consequat felis ullamcorper in. Fusce
              vel leo sit amet tellus congue tristique eu vel massa.
            </p>
            <p className="mt-2">
              Pellentesque mattis risus at risus maximus, quis eleifend nibh
              vestibulum. Etiam a semper nisl. Suspendisse potenti. Nulla
              euismod erat vel risus semper volutpat. Nulla facilisi.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-lg  font-medium leading-6 text-gray-900 dark:text-light-50">
            Our Story
          </h2>
          <div className="mt-3 text-gray-500">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              euismod convallis massa, et consequat felis ullamcorper in. Fusce
              vel leo sit amet tellus congue tristique eu vel massa.
            </p>
            <p className="mt-2">
              Pellentesque mattis risus at risus maximus, quis eleifend nibh
              vestibulum. Etiam a semper nisl. Suspendisse potenti. Nulla
              euismod erat vel risus semper volutpat. Nulla facilisi.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
