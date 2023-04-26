/* 
Path: "/howWorks"
Component: <HowWorks/>
Sistemin nasıl çalıştığını anlattığım kısa bir içerik komponenti.
*/
import { useEffect } from 'react'
import { deal } from '../../assets'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import FastForwardIcon from '@mui/icons-material/FastForward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const HowWorks = () => {
  // scrool to top on initiliaze
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <section className="flex w-full flex-col gap-16 bg-light-50 p-8 dark:bg-dark-800">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col justify-center gap-4 p-4 text-dark-800 dark:text-light-50 lg:w-1/2">
            <h1 className="text-center text-2xl text-gray-500 dark:text-white">
              Nasıl Çalışır?
            </h1>
            <p className="text-center text-xl text-gray-400 dark:text-light-50">
              Yaptırmak istediğin işe özel soruları yanıtladıktan sonra, gelen
              teklifleri dikkatli bir şekilde incele ve sana en uygun olan
              teklifi seç.
            </p>
          </div>

          <img
            src={deal}
            alt="Service deal"
            className="rounded-lg object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 p-4 text-dark-800 dark:text-light-50 lg:flex-row ">
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccessAlarmIcon />
            <p className="text-justify">
              Hizmet arayışında zaman kaybetmek istemiyorsan, dükkanları
              dolaşmak ya da tanıdıklarından referans istemek yerine, teklifleri
              direkt olarak sana ulaştıralım. Böylece zamanını sevdiklerinle
              geçirebilirsin.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <FastForwardIcon />
            <p className="text-justify">
              Hizmet alacağın servis için özel olarak hazırladığın sorulara
              hızlı bir şekilde cevap vererek, bekleyen işlerini kolayca
              halledebilirsin.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <ArrowUpwardIcon />
            <p className="text-justify">
              Eğer bir hizmet sağlayıcıysan, ilgi alanlarına göre iş
              fırsatlarını inceleyerek teklifler ver. Bu iş fırsatlarına hızlıca
              yanıt vererek, hizmet vermeye başlayabilirsin.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-8 text-justify  text-dark-800 dark:text-light-50">
          <h1 className="text-center text-2xl text-gray-500 dark:text-white">
            Hizmet Alan ve Hizmet Verenleri Bir Araya Getiriyoruz.
          </h1>
          <p className="lg:w-2/3">
            Senin için zaman kazandırmak amacıyla, hizmet arayışında dükkan
            dolaşma veya referans isteme yerine, doğrudan teklifleri sana
            ulaştırıyoruz. Özel hazırladığın sorulara hızlı cevaplar vererek,
            işlerini kolayca halledebilirsin. Hizmet sağlayıcıysan, ilgi
            alanlarına göre iş fırsatlarına teklif vererek, hizmet vermeye
            başlayabilirsin.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HowWorks
