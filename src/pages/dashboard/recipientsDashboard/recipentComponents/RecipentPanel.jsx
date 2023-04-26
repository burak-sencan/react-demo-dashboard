/*
Path: "/panel"
Component: <RecipentPanel />
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
      text: 'Son 6 ay Yaptırılan İş',
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

const RecipentPanel = () => {
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getReciPanelData(token)
        if (response.data.result) {
          setData(response.data.result)
        } else {
          setData([])
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Hata: ', error)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loading />
  return (
    <DashboardContent>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Yayındaki İlanlar</p>
          <h1 className="text-3xl text-orange-300">{data.active_requests}</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Onay Bekleyeyen İlanlar</p>
          <h1 className="text-3xl text-red-400 ">{data.pending_requests} </h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Tamamlanan İşler</p>
          <h1 className="text-3xl text-blue-400 ">{data.completed_requests}</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4 2xl:h-96">
          <p className="text-lg 2xl:text-2xl">Duraklatılan İlanlar</p>
          <h1 className="text-3xl text-purple-400">{data.paused_requests} </h1>
        </div>
      </div>
      {/* <div className="flex w-full flex-col justify-between gap-4 xl:flex-row ">
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
      </div> */}
    </DashboardContent>
  )
}

export default RecipentPanel
