import { useEffect } from 'react'
import Footer from '../../components/Footer'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import { not_found } from '../../assets'

const Help = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <section className="flex w-full flex-col gap-16 bg-light-50 p-8 dark:bg-dark-800">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-4 p-4 text-dark-800 dark:text-light-50 lg:w-1/2">
            <h1 className="text-3xl">Lorem ipsum dolor sit.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis dolor quaerat perspiciatis quasi, saepe voluptatum.
            </p>
          </div>
          <div className="p-4 lg:w-1/2">
            <img src={not_found} alt="" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4  text-dark-800 dark:text-light-50 lg:flex-row ">
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
        </div>
        <div className="flex  flex-col justify-between gap-4 text-dark-800 dark:text-light-50 lg:flex-row ">
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-8 shadow-lg dark:bg-dark-900">
            <AccountBalanceRoundedIcon />
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="p-4 lg:w-1/2">
            <img src={not_found} alt="" />
          </div>
          <div className="p-4 text-dark-800 dark:text-light-50 lg:w-1/2">
            <h1 className="text-3xl">Lorem ipsum dolor sit.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ipsam harum voluptate?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis dolor quaerat perspiciatis quasi, saepe voluptatum.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-4  text-dark-800 dark:text-light-50">
          <p className="text-justify lg:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            magnam tempora minima ducimus, vero officiis porro neque
            consequuntur totam ab autem possimus, nesciunt tenetur sunt
            laboriosam ipsa pariatur optio quasi nam assumenda ea!
            Exercitationem ducimus ipsum hic, quo magni atque.
          </p>
          <p className="text-justify lg:w-2/3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
            quidem officiis sapiente. Excepturi quibusdam eum quos. Vero
            mollitia dolore reprehenderit nulla nisi, maiores reiciendis
            necessitatibus, soluta magnam magni officiis. Eligendi suscipit
            fugit deleniti voluptate doloremque explicabo laborum quidem, quod
            modi possimus earum! Perspiciatis hic odio dolorem, non quia
            pariatur aliquam.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Help
