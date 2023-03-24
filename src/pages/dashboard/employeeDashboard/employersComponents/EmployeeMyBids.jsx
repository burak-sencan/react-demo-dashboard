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

const EmployeeMyBids = () => {
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
    api.getMyBids(token).then((response) => {
      if (response.data.result) {
        setData(response.data.result)
      } else {
        setData([])
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">Teklif Verdiklerim</div>
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
                  navigate(`/employeeDashboard/myBids/${row.original.id}`)
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

export default EmployeeMyBids
