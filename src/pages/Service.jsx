import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ServiceContext from '../context/serviceContext'
import Question from '../components/Question'
import api from '../context/api'
import { Box, Button } from '@mui/material'

const Service = () => {
  const [questions, setQuestions] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const { formData, prepareFormData } = useContext(ServiceContext)

  let { id } = useParams()

  useEffect(() => {
    api.getServiceAndDetails(id).then((response) => {
      setQuestions(response.data.result)
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
    <Box className=" flex h-screen  w-full items-center justify-center dark:bg-slate-900">
      <Box className="flex h-[500px]  w-[600px] flex-col justify-between bg-zinc-50 p-4 shadow-md">
        {activeStep < formData.length ? (
          <Question activeStep={activeStep} />
        ) : (
          <p>Gönderilecek verileri göster özetle...</p>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          {activeStep === formData.length ? (
            <Button onClick={handleSubmit}> Submit </Button>
          ) : (
            <Button onClick={handleNext}> Next </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Service
