import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import Loading from '../../utils/Loading'
import MaterialReactTable from 'material-react-table'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import DraftsIcon from '@mui/icons-material/Drafts'
import ClearIcon from '@mui/icons-material/Clear'

const RecipentMessage = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'recipient_details.full_name',
        header: 'Alıcı',
      },
      {
        accessorKey: 'message',
        header: 'Mesaj',
      },
    ],
    []
  )
  const handleDeleteMessage = (data) => {}

  useEffect(() => {
    api.getSelfMessages(token).then((response) => {
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
        <div className="p-4">Mesajlar</div>
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
                    `/recipentDashboard/message/${row.original.request_id}/${row.original.employer_id}`
                  )
                }
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Tooltip title="Mesajı Göster">
                  <DraftsIcon />
                </Tooltip>
              </IconButton>
              {/* <IconButton onClick={() => handleDeleteMessage(row.original)}>
                <Tooltip title="Mesajı sil">
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

export default RecipentMessage
