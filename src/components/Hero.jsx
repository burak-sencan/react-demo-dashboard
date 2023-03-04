import ServiceSearch from './ServiceSearch'

const Hero = () => {
  return (
    <section className="flex h-screen w-full  flex-col items-center gap-10 p-20  dark:bg-slate-900">
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Ne Yaptırmak İstiyorsun?
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
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