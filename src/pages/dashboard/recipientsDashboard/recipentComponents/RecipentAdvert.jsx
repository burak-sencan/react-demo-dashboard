/*
Path: "/advert"
Component: <RecipentAdvert/>
Kullanıcının verdiği ilanlarıgörebildiğiekran. İlan verileri /recipients/service_requests adresinden fetch edilmekte. Her satırın sonunda ilgili ilanı durdurma butonu yer almaktadır. /recipients/change_service_status adresinden ilgili ilanın statusu 
*/

import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material'
import MaterialReactTable from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { ToastContainer, toast } from 'react-toastify'

const RecipentAdvert = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  // Modal
  const [open, setOpen] = useState(false)
  const [rowId, setRowId] = useState('')
  // Should be memoized or stable
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
      accessorKey: 'location_details.countie.name',
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

  const handleClickOpen = (id) => {
    setOpen(true)
    setRowId(id)
  }

  const handleClose = () => {
    setOpen(false)
    setRowId('')
  }

  const handleServiceStatus = async () => {
    const data = {
      id: rowId,
      status: 4, // 0-6 arası ilan durumları bulunmakta. 4 ilanın durumunu duraklatıldı yapmak için kullanılıyor.
      /*
      0:onay bekliyor.
      1:yayında
      2:teklif onaylandı
      3:ilansüresi doldu
      4: Duraklatıldı
      5:onaylanmadı
      6 iş tamamlandı
      */
    }

    await api.changeServiceStatus(token, data).then((response) => {
      toast(response.data.message)

      //refetch
      api.recipientsServiceRequests(token).then((response) => {
        if (response.data.result) {
          setData(response.data.result)
          setRowId('')
          handleClose()
        } else setData([])
        setIsLoading(false)
      })
    })
  }

  useEffect(() => {
    api.recipientsServiceRequests(token).then((response) => {
      if (response.data.result) {
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
                  navigate(`/recipentDashboard/advert/${row.original.id}`)
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Tooltip title="İlan Detayı">
                  <LocalOfferIcon />
                </Tooltip>
              </IconButton>

              {row.original.status !== '4' && (
                <IconButton onClick={() => handleClickOpen(row.original.id)}>
                  <Tooltip title="İlanı Durdur">
                    <DoDisturbIcon />
                  </Tooltip>
                </IconButton>
              )}
            </Box>
          )}
        />
        <Dialog
          // fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">İlanı Durdur</DialogTitle>
          <DialogContent>
            <DialogContentText>
              İlanı Durdurmak İstediğinize Emin Misiniz?
            </DialogContentText>
            <div className="flex w-full justify-between p-4">
              <button
                onClick={handleServiceStatus}
                className="rounded-md bg-white px-4 py-2 text-red-500 shadow-md "
              >
                İlanı Durdur
              </button>
              <button
                onClick={handleClose}
                className="rounded-md bg-white px-4 py-2  shadow-md "
              >
                İptal
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </DashboardContent>
  )
}

export default RecipentAdvert
