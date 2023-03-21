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
      text: 'Chart.js Line Chart',
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
  return (
    <DashboardContent>
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p>Post</p>
          <h1 className="text-3xl text-orange-300">12</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p>Pages</p>
          <h1 className="text-3xl text-red-400 ">182</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4  2xl:h-96">
          <p>Comments</p>
          <h1 className="text-3xl text-blue-400 ">1820</h1>
        </div>
        <div className="flex h-44 w-full flex-col  items-center justify-center rounded-md bg-white text-zinc-400 shadow-md dark:bg-dark-900 dark:text-light-50 lg:w-1/4 2xl:h-96">
          <p>Messages</p>
          <h1 className="text-3xl text-purple-400">102</h1>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 xl:flex-row ">
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={data} />
        </div>
      </div>
    </DashboardContent>
  )
}

export default RecipentPanel
