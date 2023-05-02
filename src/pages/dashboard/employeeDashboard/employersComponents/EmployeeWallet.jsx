// Bu komponentte index numarasına göre yukarıdaki navbardan geçişler sağlanıyor.
// index 0 için paytr bakiye yükleme ekranı, index 1 için havale kısmı index 2 için bakiye geçmişi render edilir.'
import { useContext, useEffect, useMemo, useState } from 'react'
import api from '../../../../context/api'
import DashboardContent from '../../utils/DashboardContent'
import AuthContext from '../../../../context/authContext'
import MaterialReactTable from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Iframe from 'react-iframe'

const EmployeeWallet = () => {
  const [index, setIndex] = useState('0')

  //Navbarda tıklanılan ödeme yönteminin seçilip hemen altındaki divde render edilmesi için oluşturduğum itemlar
  const tabs = [
    {
      id: '0',
      name: 'Bakiye Yükle',
    },
    {
      id: '1',
      name: ' Banka Havalesi',
    },
    {
      id: '2',
      name: 'Bakiye Geçmişi',
    },
  ]

  return (
    <DashboardContent>
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2 rounded-md bg-white p-4 shadow-md dark:bg-dark-900 dark:text-gray-400">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${
                index === tab.id ? 'bg-dark-800 text-light-50' : ''
              } rounded-md p-2 transition`}
              onClick={() => {
                setIndex(tab.id)
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Seçilen ödeme yöntemine göre ilgili componentin render edilmesi */}
        <div className=" rounded-md bg-white p-4 dark:bg-dark-900 dark:text-light-50">
          {index === '0' ? (
            <PayOptions />
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

//Paytr kredi kartı ödeme componenti
const PayOptions = () => {
  const [budget, setBudget] = useState('')
  const { selfData } = useContext(AuthContext)
  const [showIframe, setShowIframe] = useState(false)

  const data = [
    { id: '1', value: 50, text: '50 TL' },
    { id: '2', value: 100, text: '100 TL' },
    { id: '3', value: 200, text: '200 TL' },
    { id: '4', value: 300, text: '300 TL' },
    { id: '5', value: 500, text: '500 TL' },
    { id: '6', value: 750, text: '750 TL' },
    { id: '7', value: 1000, text: '1000 TL' },
  ]

  return (
    <div className=" bg-white dark:bg-dark-900">
      {/* Butçe seçildikten sonra bu radio butonları gizlemek için showIframe state'si kullanıldı */}
      {!showIframe && (
        <>
          <FormControl className="w-full">
            <h1 className="my-2 text-lg font-bold">Yüklenecek Miktar</h1>
            <RadioGroup
              className=""
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => {
                setBudget(e.target.value)
              }}
              value={budget}
            >
              {data.map((opt) => (
                <FormControlLabel
                  className=" !m-0  w-full gap-2 rounded-md py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
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
            onClick={() => {
              setShowIframe(true)
            }}
            className="my-2 rounded-md py-2 px-4 shadow dark:bg-slate-900 dark:text-slate-50"
          >
            Ödemeye Geç
          </button>
        </>
      )}

      {/* Tutar girildikten sonra iframelerin gözükmesi için showIframe state'si kullanıldı  */}
      {showIframe && (
        <div className="mb-4  flex w-full grid-cols-2 flex-col items-center  gap-4 rounded-md p-4  shadow-md">
          {/* paytr için gerekli bilgiler linkin sonuna parametre olarak eklendi. php sayfamızda bunları aldık ve token oluşturduk bu tokeni paytr adresine post ettik bu adresten donen token ile de bir php sayfası render ettik. işte bu sayfayı reactta göstermek için alttaki iframe kullanıldı */}
          <Iframe
            url={`https://biderya.com/odeme.php?id=${
              selfData.data.result.id
            }&name=${selfData.data.result.full_name}&phone=${
              selfData.data.result.phone
            }&adress=${
              (selfData.data.result.city_id, selfData.data.result.countie_id)
            }&time=${selfData.data.result.created_at}&tutar=${budget}`}
            width="100%"
            height="auto"
            className="h-[80vh]"
            display="block"
            position="relative"
          />
        </div>
      )}
    </div>
  )
}

//Paytr havale/eft gönderme componenti
const BudgetTransfer = () => {
  const [showTransfer, setShowTransfer] = useState(false)
  const { selfData } = useContext(AuthContext)

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
        <button
          className="my-2 rounded-md py-2 px-4 shadow dark:bg-slate-900 dark:text-slate-50"
          onClick={() => {
            setShowTransfer(!showTransfer)
          }}
        >
          Havale Formu ile göndermek için tıklayın
        </button>
      </div>
      {showTransfer && (
        <div className="mb-4  flex w-full grid-cols-2 flex-col items-center  gap-4 rounded-md p-4  shadow-md">
          <Iframe
            url={`https://biderya.com/odeme.php?id=${
              selfData.data.result.id
            }&name=${selfData.data.result.full_name}&phone=${
              selfData.data.result.phone
            }&adress=${
              (selfData.data.result.city_id, selfData.data.result.countie_id)
            }&time=${selfData.data.result.created_at}`}
            width="100%"
            height="auto"
            className="h-[80vh]"
            display="block"
            position="relative"
          />
        </div>
      )}
    </div>
  )
}

//Ödeme Geçmiş ekranı
const BudgetHistory = () => {
  const { token } = useContext(AuthContext)

  const columns = useMemo(() => [
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
  ])
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
