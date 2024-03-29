/*
Path: "/jobOpportunities"
Component: <EmployeeJobOpportunities/>
Kullanıcının ilgi alanlarına göre ilanların /employers/opportunities adresinden fetch edilgi yer. 
Bu ilanlar React Material Table kütüphanesi ile bir tabloda gösterilmekte. satır sonlarında bulunan detay butonu ile ilgili ilanın detaylarını görebilmektedir.
*/

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

const EmployeeJobOpportunities = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const columns = useMemo(() => [
    {
      accessorKey: 'service_details.name',
      header: 'Servis Adı',
    },
    {
      accessorKey: 'location_details.city.name',
      header: 'İl',
    },
    {
      accessorKey: 'location_details.countie.name',
      header: 'İlçe',
    },
    {
      accessorKey: 'location_details.district.name',
      header: 'Mahalle',
    },
    {
      accessorKey: 'duration',
      header: 'Süre',
      Cell: ({ cell }) => (
        <p>
          {cell.getValue().slice(8, 10)}/{cell.getValue().slice(5, 7)}/
          {cell.getValue().slice(0, 4)}
        </p>
      ),
    },
    {
      accessorKey: 'budget',
      header: 'Bütçe',
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
  ])

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getOpportunities(token)
        if (response.data.status === false) {
          setData([])
        } else {
          setData(response.data.result)
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
      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">
          İş Fırsatları
          <Info
            title={'İş Fırsatları'}
            text={
              'Ayarlar bölümündeki ilgi alanlarınıza göre size gösterilen iş fırsatları ekranı.'
            }
          />
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
                    `/employeeDashboard/jobOpportunities/${row.original.id}`
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

export default EmployeeJobOpportunities
