import { useEffect } from 'react'
import Footer from '../../components/Footer'

const AboutUs = () => {
  // scrool to top on initiliaze
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="">
      <div className="mx-auto flex w-2/3 flex-col items-center gap-16  py-8 lg:p-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900  dark:text-light-50 sm:text-5xl md:text-6xl">
            Hakkımızda
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            Hoş geldiniz!
          </p>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            Biz, hizmet veren ve hizmet alan insanları bir araya getirmeyi
            hedefleyen bir firmayız. Amacımız, kullanıcılarımızın hayatını
            kolaylaştırmak ve ihtiyaçlarına yönelik en uygun hizmetleri yapan ve
            yaptırmak isteyen issanları bir araya getirmek.
          </p>
        </div>
        <div className="mt-12">
          <p className=" mt-3 text-justify text-gray-500">
            Uzman yazılım kadromuzla birlikte, bir ilan sitemiz aracılığıyla
            kullanıcılarımızın taleplerini karşılamak için çalışıyoruz.
            Sitemizde, iş arayanlar ve işverenler arasında bir bağlantı kurarak,
            her iki tarafın da ihtiyaçlarını karşılamaya yardımcı oluyoruz. Siz
            de iş arıyorsanız, sitemizde size uygun ilanları görüntüleyebilir
            veya işveren olarak ilan vererek iş arayanlarla bağlantı
            kurabilirsiniz. Kullanıcılarımızın memnuniyeti bizim önceliğimizdir.
            Bu nedenle, sunduğumuz hizmetlerin kalitesini sürekli olarak
            artırmak için çaba gösteriyoruz. Sorularınız veya geri
            bildirimleriniz için her zaman buradayız. Teşekkürler, bize
            katıldığınız için mutluyuz!
          </p>
        </div>
        <div className="mt-12">
          <h2 className="text-lg  font-medium leading-6 text-gray-900 dark:text-light-50">
            Hikayemiz
          </h2>
          <div className="mt-3 text-justify text-gray-500">
            <p>
              Uzman yazılım kadromuzla birlikte, hayatı daha da kolaylaştırmak
              ve insanların birbirleriyle daha kolay etkileşim kurmasını
              sağlamak için buradayız.
            </p>
            <p className="mt-2">
              İşimiz, insanların ihtiyaçlarını karşılamalarına yardımcı olmak ve
              hizmet alan ve hizmet veren kişiler arasında bir köprü kurmaktır.
              İlan sitemiz, bu amaçla tasarlanmıştır ve sunduğumuz araçlar
              sayesinde kullanıcılarımızın birbirleriyle etkileşim kurmaları ve
              ihtiyaçlarını karşılamaları daha da kolaylaşır.
            </p>
            <p className="mt-2">
              Birlikte çalışan bir ekibiz ve hizmetlerimizin kalitesini her
              zaman geliştirmeye çalışıyoruz. Sunduğumuz çözümlerle, insanların
              işlerini daha verimli bir şekilde yapmalarına yardımcı olmak
              istiyoruz. Kullanıcılarımızın geri bildirimlerini dikkate alarak,
              sürekli olarak kendimizi geliştiriyor ve daha iyi bir hizmet
              sunmaya çalışıyoruz.
            </p>
            <p className="mt-2">
              Hizmetlerimizden faydalanan insanlar ve onlara hizmet sunan
              kişiler için bir aracı görevi görmekten gurur duyuyoruz ve
              gelecekte de bu amaçla çalışmaya devam edeceğiz.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
