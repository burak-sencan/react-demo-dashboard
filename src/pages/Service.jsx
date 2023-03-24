import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ServiceContext from '../context/serviceContext'
import AuthContext from '../context/authContext'
import QuestionType from '../components/QuestionType'
import api from '../context/api'
import { Box, Button, Divider, Tooltip } from '@mui/material'
import Spinner from '../components/Spinner'
import { toast, ToastContainer } from 'react-toastify'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FormSummary from '../components/form/FormSummary'

const Service = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { formData, prepareFormData } = useContext(ServiceContext)
  const { selfData } = useContext(AuthContext)

  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    api.getServiceAndDetails(id).then((response) => {
      prepareFormData(response.data.result)
    })
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = () => {
    let questions_and_values = []
    let service_id
    let city_id
    let countie_id
    let district_id
    let duration
    let workDetail
    let canSeeNumber
    let showBudget
    let budget

    formData.forEach((item) => {
      if (item.question_id != null) {
        service_id = item.service_id
        questions_and_values.push({
          question: item.question,
          answer: item.answer,
        })
      } else {
        if (item.type_id === 'adress') {
          service_id = item.service_id
          city_id = item.answer[0]
          countie_id = item.answer[1]
          district_id = item.answer[2]
        }
        if (item.type_id === 'duration') {
          //convert to dd/mm/yyyy
          const date = new Date()
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')
          const formattedDate = `${year}-${month}-${day}`

          duration = formattedDate
        }
        if (item.type_id === 'workDetail') {
          workDetail = item.answer
        }
        if (item.type_id === 'canSeeNumber') {
          canSeeNumber = item.answer
        }
        if (item.type_id === 'showBudget') {
          if (item.answer === 0) {
            showBudget = 0
            budget = 0
          } else {
            showBudget = 1
            budget = item.answer
          }
        }
      }
    })

    const data = {
      questions_and_values: questions_and_values,
      city_id: `${city_id}`,
      countie_id: `${countie_id}`,
      district_id: `${district_id}`,
      duration: duration,
      details: workDetail,
      can_see_number: canSeeNumber,
      show_budget: `${showBudget}`,
      budget: `${budget}`,
      service_id: `${service_id}`,
    }

    postFormData(token, data)
  }

  const postFormData = async (token, data) => {
    api.recipientsAddServiceRequest(token, data).then((response) => {
      toast(response.data.message)
      toast('Anasayfaya Dönülüyor.')
      setTimeout(() => {
        navigate('/')
      }, 5000)
    })
  }

  if (selfData.data.result.account_type === '2') {
    return (
      <div className="flex h-96 flex-col justify-center gap-4 ">
        <p>Sadece Hizmet Alanlar Talep Oluşturabilir. </p>
        <p>
          Talep Oluşturabilmeniz İçin Hizmet Alan Tipinde Bir Hesap İle Giriş
          Yapmalısınız.
        </p>
        <Divider />
        <Link to="/">
          <Tooltip title="Anasayfa'ya Dön">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Tooltip>
        </Link>
      </div>
    )
  }

  return (
    <Box className=" flex w-full items-center justify-center p-2 ">
      <Box className="flex h-[500px]  w-[600px] flex-col justify-between gap-4 rounded-md bg-zinc-50 p-4 capitalize shadow-md">
        {formData.length === 0 ? (
          <Spinner />
        ) : activeStep < formData.length ? (
          <QuestionType activeStep={activeStep} />
        ) : (
          <FormSummary />
        )}

        <Box sx={{ flex: '1 1 auto' }} />

        {formData.length === 0 ? (
          <></>
        ) : activeStep === formData.length ? (
          <Box className="flex justify-between">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button onClick={handleSubmit}> Submit </Button>
          </Box>
        ) : (
          <Box className="flex justify-between">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleNext}
              disabled={
                formData[activeStep].answer === null ||
                formData[activeStep].answer.length === 0
              }
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  )
}

export default Service
