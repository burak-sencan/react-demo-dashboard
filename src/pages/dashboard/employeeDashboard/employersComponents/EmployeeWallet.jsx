// Bu komponentte index numarasına göre yukarıdaki navbardan geçişler sağlanıyor.
// index 0 için paytr bakiye yükleme ekranı, index 1 için havale kısmı index 2 için bakiye geçmişi render edilir.'
import { useContext, useEffect, useMemo, useState } from 'react'
import api from '../../../../context/api'
import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import MaterialReactTable from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import EmployeeShowBudgetTransfer from './EmployeeShowBudgetTransfer'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const EmployeeWallet = () => {
  const [index, setIndex] = useState('0')
  const [budget, setBudget] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setBudget('')
  }
  const data = [
    { id: '1', value: '300', text: '300 TL' },
    { id: '2', value: '500', text: '500 TL' },
    { id: '3', value: '1000', text: '1000 TL' },
    { id: '4', value: '2000', text: '2000 TL' },
    { id: '5', value: '4000', text: '4000 TL' },
  ]

  return (
    <DashboardContent>
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2 rounded-md bg-white p-4 shadow-md dark:bg-dark-900 dark:text-gray-400">
          <button
            className={`${
              index === '0' ? 'bg-dark-800 text-light-50' : ''
            } rounded-md p-2 transition`}
            onClick={() => {
              setIndex('0')
            }}
          >
            Bakiye Yükle
          </button>
          <button
            className={`${
              index === '1' ? 'bg-dark-800 text-light-50' : ''
            } rounded-md p-2 transition`}
            onClick={() => {
              setIndex('1')
            }}
          >
            Banka Havalesi
          </button>
          <button
            className={`${
              index === '2' ? 'bg-dark-800 text-light-50' : ''
            } rounded-md p-2 transition`}
            onClick={() => {
              setIndex('2')
            }}
          >
            Bakiye Geçmişi
          </button>
        </div>

        <div className=" rounded-md bg-white p-4 dark:bg-dark-900 dark:text-light-50">
          {index === '0' ? (
            <div className=" bg-white dark:bg-dark-900">
              <FormControl className="w-full">
                <h1 className="my-2 text-lg font-bold">Yüklenecek Miktar</h1>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setBudget(e.target.value)
                  }}
                  value={budget}
                >
                  {data.map((opt) => (
                    <FormControlLabel
                      className=" !m-0 w-full gap-2 rounded-md py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
                      labelPlacement="end"
                      key={opt.id}
                      value={opt.value}
                      control={<Radio color="success" />}
                      label={opt.text}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <button
                onClick={onSubmit}
                className="my-2 rounded-md py-2 px-4 shadow dark:bg-slate-900 dark:text-slate-50"
              >
                Gönder
              </button>
            </div>
          ) : index === '1' ? (
            <BudgetTransfer />
          ) : index === '2' ? (
            <BudgetHistory />
          ) : null}
        </div>
      </div>
    </DashboardContent>
  )
}

const BudgetTransfer = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const { token } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Müşteri Adı',
      },
      {
        accessorKey: 'bank_name', //normal accessorKey
        header: 'Banka Adı',
      },
      {
        accessorKey: 'iban',
        header: 'IBAN',
      },
      {
        accessorKey: 'state',
        header: 'Durumu',
        Cell: ({ cell }) => (
          <p>{`${cell.getValue() === '0' ? 'Kapalı' : 'Açık'}`} </p>
        ),
      },
    ],
    []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [bankAcccountId, setBankAcccountId] = useState('')

  useEffect(() => {
    api.getBankAccounts(token).then((response) => {
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="mb-4  flex w-full grid-cols-2 flex-col items-center  gap-4 rounded-md p-4  shadow-md">
        <div className=" col-span-2  m-2 flex flex-col items-center gap-4">
          <p className="text-xl">
            Ödemenin Yansıması için aşağıdaki açıklama kodunu Havale/EFT
            yaparken açıklama kısmına mutlaka yaz
          </p>
          <div className="flex items-center gap-2 rounded-md bg-gray-300 p-8 dark:bg-slate-900">
            <button
              className="active:text-lime-500"
              onClick={() => {
                navigator.clipboard.writeText('Kodu kopyala')
              }}
            >
              P546a5sd876
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 flex-col gap-4 rounded-md  p-4 shadow-md lg:w-2/3  lg:grid-cols-2">
          <div>
            <p className="font-bold">İsim</p>
            <p>Biderya Bilişim A.ş</p>
          </div>
          <div>
            <p className="font-bold">Banka</p>
            <p>Halk Bankası</p>
          </div>
          <div>
            <p className="font-bold">Şube</p>
            <p>Halk Bankası şube</p>
          </div>

          <div>
            <p className="font-bold">Açıklama</p>
            <div className="flex gap-2">
              <p>P546a5sd876</p>
              <button
                className="active:text-lime-500"
                onClick={() => {
                  navigator.clipboard.writeText('Kodu kopyala')
                }}
              >
                <ContentCopyIcon />
              </button>
            </div>
          </div>
          <div>
            <p className="font-bold">İban</p>
            <div className="flex items-center gap-2">
              <p>123123123123123123</p>
              <button
                className="active:text-lime-500"
                onClick={() => {
                  navigator.clipboard.writeText('Kodu kopyala')
                }}
              >
                <ContentCopyIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={data}
        state={{ isLoading }}
        enableRowActions
        positionActionsColumn="last"
        localization={MRT_Localization_TR}
        muiTablePaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '0.5rem',
            overflow: 'hidden',
          },
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <IconButton
              onClick={
                // navigate(
                //   `/employeeDashboard/wallet/transfer/${row.original.id}`
                // )
                () => {
                  setBankAcccountId(row.original.id)
                  handleOpen()
                }
              }
              sx={{
                cursor: 'pointer',
              }}
            >
              <Tooltip title="Ödeme Yaptım">
                <PaymentIcon />
              </Tooltip>
            </IconButton>
          </Box>
        )}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="h-full w-full rounded-md dark:bg-dark-800 lg:h-[90vh] lg:w-2/3"
        >
          <EmployeeShowBudgetTransfer
            handleClose={handleClose}
            bankAcccountId={bankAcccountId}
          />
        </Box>
      </Modal>
    </div>
  )
}

const BudgetHistory = () => {
  const { token } = useContext(AuthContext)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'customer_name',
        header: 'Müşteri Adı',
      },
      {
        accessorKey: 'bank_name', //normal accessorKey
        header: 'Banka Adı',
      },
      {
        accessorKey: 'iban',
        header: 'IBAN',
      },
      {
        accessorKey: 'state',
        header: 'Durumu',
      },
    ],
    []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    api.getBalanceHistory(token).then((response) => {
      if (response.data.result) {
        setData(response.data.result)
      } else {
        setData([])
      }
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        state={{ isLoading }}
        enableRowActions
        positionActionsColumn="last"
        localization={MRT_Localization_TR}
        muiTablePaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '0.5rem',
            overflow: 'hidden',
          },
        }}
      />
    </div>
  )
}

export default EmployeeWallet
