import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import { useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { toast, ToastContainer } from 'react-toastify'
import { Divider } from '@mui/material'

const EmployeeAddToYourSite = () => {
  const { selfData } = useContext(AuthContext)
  const [cryptedData, setCryptedData] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `<a href="https://biderya.com/register?ref=${cryptedData}"></a>`
    )
    console.log(
      `<a href="https://biderya.com/register?ref=${cryptedData}"></a>`
    )
    toast('Link Kopyalandı')
  }

  useEffect(() => {
    const data = {
      id: selfData.data.result.id,
      full_name: selfData.data.result.full_name,
      city_id: selfData.data.result.city_id,
      countie_id: selfData.data.result.countie_id,
      district_id: selfData.data.result.district_id,
    }
    setCryptedData(
      CryptoJS.AES.encrypt(
        JSON.stringify(data),
        'Afndkflas1abt5pas2g'
      ).toString()
    )
    console.log(cryptedData)
  }, [])

  return (
    <DashboardContent>
      <div className=" flex flex-col overflow-auto rounded-md bg-white  pt-2 pr-2 pl-2 shadow-md  dark:bg-dark-900 dark:text-dark-900 lg:p-4">
        <p className="rounded p-2 text-center text-xl capitalize dark:bg-dark-900 dark:text-light-50">
          Bu linki sitenize ekleyin. Bu link üzerinden kayıt olması halinde 5
          ücretsiz teklif verme hakkı kazanın.
        </p>
        <Divider sx={{ marginY: 2 }} />
        <p
          onClick={handleCopy}
          className=" w-full cursor-pointer overflow-x-auto rounded-md bg-light-50 p-4 transition hover:bg-neutral-200 focus:outline-none"
        >
          {`<a href="https://biderya.com/registerref=${cryptedData}"></a>`}
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </DashboardContent>
  )
}

export default EmployeeAddToYourSite
