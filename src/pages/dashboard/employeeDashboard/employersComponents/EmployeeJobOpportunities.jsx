import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import MaterialReactTable from 'material-react-table'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Loading from '../../utils/Loading'

const EmployeeJobOpportunities = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const columns = useMemo(() => [
    {
      accessorKey: 'service_details.name',
      header: 'Servis Adı',
    },
    {
      accessorKey: 'location_details.city_name',
      header: 'İl',
      maxSize: 20,
    },
    {
      accessorKey: 'location_details.countie_name',
      header: 'İlçe',
      maxSize: 20,
    },
    {
      accessorKey: 'location_details.district_name',
      header: 'Mahalle',
      maxSize: 20,
    },
    {
      accessorKey: 'duration',
      header: 'Süre',
    },
    {
      accessorKey: 'budget',
      header: 'Bütçe',
      Cell: ({ cell }) => (
        <p>{`${cell.getValue() === 0 ? 'Belirtilmedi' : cell.getValue()}`} </p>
      ),
    },
  ])

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() => {
    api.getOpportunities(token).then((response) => {
      console.log(response)
      if (response.data.status === false) {
        // no data
        setData([])
      } else {
        setData(response.data.result)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">İş Fırsatları</div>
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
