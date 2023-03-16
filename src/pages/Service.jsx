import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ServiceContext from '../context/serviceContext'
import AuthContext from '../context/authContext'
import QuestionType from '../components/QuestionType'
import api from '../context/api'
import { Box, Button } from '@mui/material'
import Spinner from '../components/Spinner'
import { toast, ToastContainer } from 'react-toastify'

const Service = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { formData, prepareFormData } = useContext(ServiceContext)
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
    let question_and_value_ids = {}
    let service_id
    let province_id
    let countie_id
    let districts_id
    let duration
    let workDetail
    let canSeeNumber
    let showBudget
    let budget

    formData.forEach((item) => {
      if (item.questionId != null) {
        service_id = item.service_id
        question_and_value_ids[item.questionId] = item.answer
      } else {
        if (item.type_name === 'adress') {
          province_id = item.answer[0]
          countie_id = item.answer[1]
          districts_id = 0
          if (item.answer.length > 3) districts_id = item.answer[2]
        }
        if (item.type_name === 'duration') {
          //convert to dd/mm/yyyy
          const date = new Date()
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')
          const formattedDate = `${year}-${month}-${day}`

          duration = formattedDate
        }
        if (item.type_name === 'workDetail') {
          workDetail = item.answer
        }
        if (item.type_name === 'canSeeNumber') {
          canSeeNumber = item.answer
        }
        if (item.type_name === 'showBudget') {
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
      question_and_value_ids: question_and_value_ids,
      province_id: province_id,
      countie_id: countie_id,
      districts_id: districts_id,
      duration: duration,
      details: workDetail,
      can_see_number: canSeeNumber,
      show_budget: showBudget,
      budget: budget,
      service_id: service_id,
    }

    postFormData(token, data)
  }

  const postFormData = async (token, data) => {
    api.getClientServices(token, data).then((response) => {
      toast(response.data.message)
      toast('Anasayfaya Dönülüyor.')
      setTimeout(() => {
        navigate('/')
      }, 5000)
    })
  }

  return (
    <Box className=" flex w-full items-center justify-center p-2 ">
      <Box className="flex h-[500px]  w-[600px] flex-col justify-between gap-4 rounded-md bg-zinc-50 p-4 capitalize shadow-md">
        {formData.length === 0 ? (
          <Spinner />
        ) : activeStep < formData.length ? (
          <QuestionType activeStep={activeStep} />
        ) : (
          <p>Gönderme ekranı?</p>
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
