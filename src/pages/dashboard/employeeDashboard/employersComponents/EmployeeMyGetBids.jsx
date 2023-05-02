import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import MaterialReactTable from 'material-react-table'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Loading from '../../../../components/Loading'
import Info from '../../utils/Info'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as TooltipChartjs2,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TooltipChartjs2,
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

export const chartData = {
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

const EmployeeMyGetBids = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const columns = useMemo(() => [
    {
      accessorKey: 'request_details.service_details.name',
      header: 'Servis Adı',
      maxSize: 20,
    },
    {
      accessorKey: 'request_details.location_details.city.name',
      header: 'İl',
      maxSize: 20,
    },
    {
      accessorKey: 'request_details.location_details.countie.name',
      header: 'İlçe',
      maxSize: 20,
    },
    {
      accessorKey: 'request_details.location_details.district.name',
      header: 'Mahalle',
      maxSize: 20,
    },
    {
      accessorKey: 'request_details.duration',
      header: 'Süre',
      maxSize: 20,
    },
    {
      accessorKey: 'request_details.budget',
      header: 'Bütçe',
      maxSize: 20,
      Cell: ({ cell }) => (
        <p>
          {`${
            cell.getValue() === 1000
              ? '1.000 - 5.000 ₺'
              : cell.getValue() === 5000
              ? '5.000 - 10.000 ₺'
              : cell.getValue() === 10000
              ? '10.000 - 15.000 ₺'
              : cell.getValue() === 15000
              ? '15.000 - 30.000 ₺'
              : cell.getValue() === 30000
              ? '30.000 - 50.000 ₺'
              : cell.getValue() === 50000
              ? '50.000 - 100.000 ₺'
              : cell.getValue() === 100000
              ? '100.000+ ₺'
              : cell.getValue()
          }`}
        </p>
      ),
    },
    {
      accessorKey: 'quote_message',
      header: 'Mesaj',
    },
    {
      accessorKey: 'quote_price',
      header: 'Teklif Fiyatı',
      maxSize: 20,
    },
  ])

  // const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getMyWonBids(token)
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
      <div className="flex  w-full justify-between gap-4 xl:flex-row">
        <div className="flex items-center  justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={chartData} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-white p-2 shadow-md dark:bg-dark-900 xl:w-1/2">
          <Line options={options} data={chartData} />
        </div>
      </div>

      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">
          Kazandığım Teklifler <Info title={'Kazandığım Teklifler'} text={''} />
        </div>
        <Divider />
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowActions
          positionActionsColumn="last"
          localization={MRT_Localization_TR}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              borderRadius: '0.5rem',
              overflow: 'hidden',
            },
          }}
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <IconButton
                onClick={() =>
                  navigate(
                    `/employeeDashboard/getBids/${row.original.request_id}`
                  )
                }
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Tooltip title="Teklif Ver">
                  <LocalOfferIcon />
                </Tooltip>
              </IconButton>
            </Box>
          )}
        />
      </div>
    </DashboardContent>
  )
}

export default EmployeeMyGetBids
