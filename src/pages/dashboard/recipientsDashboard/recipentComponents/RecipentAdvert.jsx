import { useContext, useEffect, useMemo, useState } from 'react'
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
      accessorKey: 'service_details.name',
      header: 'Servis Adı',
    },
    {
      accessorKey: 'location_details.city.name',
      header: 'İl',
      maxSize: 20,
    },
    {
      accessorKey: 'location_details.county.name',
      header: 'İlçe',
      maxSize: 20,
    },
    {
      accessorKey: 'location_details.district.name',
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
    {
      accessorKey: 'status',
      header: 'Durum',
      Cell: ({ cell }) => (
        <p>
          {`${
            cell.getValue() === '0'
              ? 'Onay Bekliyor'
              : cell.getValue() === '1'
              ? 'Yayında'
              : cell.getValue() === '2'
              ? 'Teklif Onaylandı'
              : cell.getValue() === '3'
              ? 'İlan Süresi Doldu'
              : cell.getValue() === '4'
              ? 'Duraklatıldı'
              : cell.getValue() === '5'
              ? 'Onaylanmadı'
              : cell.getValue() === '6'
              ? 'İş Tamamlandı'
              : 'İlan Durumu 0-6 arasında değil Hata'
          }`}
        </p>
      ),
    },
  ])

  const [data, setData] = useState([])

  useEffect(() => {
    api.recipientsServiceRequests(token).then((response) => {
      if (response.data.result) {
        console.log(response.data.result)
        setData(response.data.result)
      } else setData([])
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
