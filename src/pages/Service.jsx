import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ServiceContext from '../context/serviceContext'
import QuestionType from '../components/QuestionType'
import api from '../context/api'
import { Box, Button } from '@mui/material'
import Spinner from '../components/Spinner'

const Service = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { formData, prepareFormData } = useContext(ServiceContext)

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

  const handleSubmit = () => {}

  return (
    <Box className=" flex w-full items-center justify-center ">
      <Box className="flex h-[500px]  w-[600px] flex-col justify-between gap-4 rounded-md bg-zinc-50 p-4 capitalize shadow-md">
        {formData.length === 0 ? (
          <Spinner />
        ) : activeStep < formData.length ? (
          <QuestionType activeStep={activeStep} />
        ) : (
          <p>Gönderilecek verileri göster özetle...</p>
        )}

        <Box sx={{ flex: '1 1 auto' }} />

        {formData.length === 0 ? (
          <></>
        ) : activeStep === formData.length ? (
          <Button onClick={handleSubmit}> Submit </Button>
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
    </Box>
  )
}

export default Service
