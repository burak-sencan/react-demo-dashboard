/*
Path: "/message"
Component: <EmployeeMessage/>
Kullanıcının mesajlarının listelendiği ekran 
*/

import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import MaterialReactTable from 'material-react-table'
import DraftsIcon from '@mui/icons-material/Drafts'
import ClearIcon from '@mui/icons-material/Clear'
import Loading from '../../../../components/Loading'
import Info from '../../utils/Info'

const EmployeeMessage = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'recipient_details.full_name',
        header: 'Alıcı',
        maxSize: 50,
      },
      {
        accessorKey: 'message',
        header: 'Mesaj',
      },
    ],
    []
  )

  useEffect(() => {
    api
      .getSelfMessages(token)
      .then((response) => {
        if (response.data.result) {
          setData(response.data.result)
        } else {
          setData([])
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Hata: ', error)
      })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div className="rounded-md bg-white shadow-md">
        <div className="p-4">
          Mesajlar
          <Info
            title={'Mesajlar'}
            text={
              'Hizmet alan ve Hizmet veren arasındaki mesajların gösterildiği ekran'
            }
          />
        </div>
        <Divider />
        <MaterialReactTable
          enableColumnResizing
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
                onClick={() => {
                  navigate(
                    `/employeeDashboard/message/${row.original.request_id}/${row.original.recipient_id}`
                  )
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Tooltip title="Mesajı Göster">
                  <DraftsIcon />
                </Tooltip>
              </IconButton>
              {/* <IconButton onClick={() => console.log(row.original)}>
                <Tooltip title="İlanı Sil">
                  <ClearIcon />
                </Tooltip>
              </IconButton> */}
            </Box>
          )}
        />
      </div>
    </DashboardContent>
  )
}

export default EmployeeMessage
