import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import MaterialReactTable from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'

const RecipentAdvert = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  //should be memoized or stable
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

  const [data, setData] = useState([])

  useEffect(() => {
    api.getSelfServiceRequests(token).then((response) => {
      console.log(response)

      if (response.data.result) setData(response.data.result)
      else setData([])
      setIsLoading(false)
    })
  }, [])

  return (
    <DashboardContent>
      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">Verilen İlanlar</div>
        <Divider />
        <MaterialReactTable
          columns={columns}
          data={data}
          state={{ isLoading }}
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
                onClick={() => {
                  console.log(row)
                  navigate(`/recipentDashboard/advert/${row.original.id}`)
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Tooltip title="Gelen Teklifler">
                  <LocalOfferIcon />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => console.log(row.original.id)}>
                <Tooltip title="İlanı Durdur">
                  <DoDisturbIcon />
                </Tooltip>
              </IconButton>
            </Box>
          )}
        />
      </div>
    </DashboardContent>
  )
}

export default RecipentAdvert
