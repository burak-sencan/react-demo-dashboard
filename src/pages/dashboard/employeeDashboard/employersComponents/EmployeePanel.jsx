/*
Path: "/panel"
Component: <EmployeePanel/>
Kullanıcının genel bilgilerinin gösterildiği ekran Bu veriler /employers/dashboard_data  adresinden çekiliyor.
*/

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import DashboardContent from '../../utils/DashboardContent'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../../context/authContext'
import api from '../../../../context/api'
import Loading from '../../../../components/Loading'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Son 6 Ay Tamamlanan İş',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [41, 22, 13, 64, 5, 46, 27],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 22, 13, 44, 15, 6, 17],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const EmployeePanel = () => {
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPanelData(token)
        if (response.data.result) {
          setData(response.data.result)
        } else {
          setData([])
        }
        setIsLoading(false)
      } catch (error) {
        // Hata yakalanması ve işlenmesi
        console.error('Hata: ', error)
        // Hatanın durumunu ve kullanıcıya uygun bir geri bildirim sağlanabilir
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">İlan</p>
          <h1 className="text-3xl text-orange-300 2xl:text-5xl">{data.bids}</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Kazandığım İş</p>
          <h1 className="text-3xl text-red-400 2xl:text-5xl ">
            {data.won_bids}
          </h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Tamamlanan İş</p>
          <h1 className="text-3xl text-blue-400 2xl:text-5xl ">
            {data.completed_requests}
          </h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4 2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Bakiye</p>
          <h1 className="text-3xl text-purple-400 2xl:text-5xl">
            {data.balance}
          </h1>
        </div>
      </div>
      {/* <div className="flex w-full flex-col justify-between gap-4 xl:flex-row">
        <div className="flex items-center  justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
      </div> */}
    </DashboardContent>
  )
}

export default EmployeePanel
