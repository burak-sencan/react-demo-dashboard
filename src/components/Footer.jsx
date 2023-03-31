import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { logo_footer } from '../assets'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-4 bg-dark-800 pt-8 text-gray-400 dark:bg-dark-900 ">
      <div className=" flex w-full flex-col items-center gap-4  p-8 lg:flex-row ">
        <div className="flex w-2/3 flex-col gap-1 px-8 py-4 lg:self-start">
          <p className="text-xl">Bilgi</p>
          <Divider className="!my-1 !bg-gray-400" />
          <Link className="text-base hover:text-white" to="/howWorks">
            Nasıl Çalışır
          </Link>
          <Link className="text-base hover:text-white" to="/help">
            Yardım
          </Link>
          <Link className="text-base hover:text-white" to="/blog">
            Blog
          </Link>
          <Link className="text-base hover:text-white" to="/aboutUs">
            Hakkımızda
          </Link>
        </div>
        <div className="flex w-2/3 flex-col gap-1 px-8 py-4 lg:self-start">
          <p className="text-xl">Hizmetler</p>
          <Divider className="!my-1 !bg-gray-400" />
          <Link className="text-base hover:text-white" to="#">
            Tadilat
          </Link>
          <Link className="text-base hover:text-white" to="#">
            Mobilya
          </Link>
          <Link className="text-base hover:text-white" to="#">
            Mutfak Dolabı
          </Link>
        </div>
        <div className="flex w-2/3 flex-col gap-1 px-8 py-4 lg:self-start ">
          <p className="text-xl">Fiyatlar</p>
          <Divider className="!my-1 !bg-gray-400" />
          <Link className="text-base hover:text-white" to="#">
            Nasıl Çalışır
          </Link>
          <Link className="text-base hover:text-white" to="#">
            Yardım
          </Link>
          <Link className="text-base hover:text-white" to="#">
            Blog
          </Link>
          <Link className="text-base hover:text-white" to="#">
            Hakkımızda
          </Link>
        </div>
        <div className="flex w-2/3 flex-col gap-1 px-8 py-4 lg:self-start ">
          <p className="text-xl">İleşitim</p>
          <Divider className="!my-1 !bg-gray-400" />
          <p className="flex ">
            <span className="mr-2">
              <LocationOnRoundedIcon />
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className="flex ">
            <span className="mr-2">
              <LocalPhoneRoundedIcon />
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className="flex ">
            <span className="mr-2">
              <LocalPhoneRoundedIcon />
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col-reverse justify-center gap-8 p-4 lg:flex-row  lg:justify-between">
        <div className="flex flex-col items-center gap-8 md:gap-4">
          <Link to="/">
            <img
              src={logo_footer}
              className="w-32 rounded-lg  bg-white py-1 px-4"
              alt="logo"
            />
          </Link>
          <p className="p-4 text-center text-sm  lg:p-0">
            © 2011 - 2023 Biderya Teknoloji AŞ, Tüm Hakları Saklıdır
          </p>
        </div>
        <div className="flex justify-center gap-8 md:gap-4 lg:self-end">
          <Link className="hover:text-white" to="#">
            <LinkedInIcon />
          </Link>
          <Link className="hover:text-white" to="#">
            <TwitterIcon />
          </Link>
          <Link className="hover:text-white" to="#">
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
