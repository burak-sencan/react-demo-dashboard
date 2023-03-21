import ServiceSearch from './ServiceSearch'

const Hero = () => {
  return (
    <section className="flex  min-h-[100vh] w-full flex-col items-center justify-start gap-10 p-10 text-center lg:p-20">
      <div>
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-wide text-dark-800 dark:text-white md:text-5xl lg:text-6xl">
          Ne Yaptırmak İstiyorsun?
        </h1>
        <p className="text-md mb-6 font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          İşin Uzmanlarına Kolayca Ulaş ve Hizmet Al
        </p>
      </div>

      <div>
        <ServiceSearch />
      </div>
    </section>
  )
}

export default Hero
