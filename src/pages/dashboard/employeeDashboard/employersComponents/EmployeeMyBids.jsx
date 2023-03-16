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

const data = [
  {
    request_id: '1',
    service_name: '1',
    adress: '1',
    duration: '1',
    budge: '1',
  },
]
const EmployeeMyBids = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const columns = useMemo(() => [
    {
      accessorKey: 'service_name',
      header: 'Servis Adı',
    },
    {
      accessorKey: 'province_name',
      header: 'İl',
    },
    {
      accessorKey: 'countie_name',
      header: 'İlçe',
    },
    {
      accessorKey: 'district_name',
      header: 'Mahalle',
    },
    {
      accessorKey: 'duration',
      header: 'Süre',
    },
    {
      accessorKey: 'budget',
      header: 'Bütçe',
    },
  ])

  const [isLoading, setIsLoading] = useState(true)
  // const [data, setData] = useState([])
  useEffect(() => {
    api.getBankAccounts(token).then((response) => {
      console.log(response)
      // setData(response.data.result)
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
                  navigate(
                    `/employeeDashboard/myBids/${row.original.request_id}`
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

export default EmployeeMyBids
