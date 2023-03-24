import { useContext, useEffect, useMemo, useState } from 'react'
import api from '../../../../context/api'
import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import MaterialReactTable from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'

const EmployeeWallet = () => {
  const [index, setIndex] = useState('0')
  const [budget, setBudget] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setBudget('')
  }

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
            <div className=" flex h-48 items-center  bg-white dark:bg-dark-900">
              <form
                action=""
                className="flex flex-col gap-4"
                onSubmit={onSubmit}
              >
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bakiye Miktarı
                </label>
                <input
                  type="text"
                  name="budget"
                  id="budget"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
                >
                  Gönder
                </button>
              </form>
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
    api.getBankAccounts(token).then((response) => {
      setData(response.data.result)
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
    api.getSelfBalanceHistory(token).then((response) => {
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
