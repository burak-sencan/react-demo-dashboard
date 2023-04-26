// formdatada ilgili servisin soruları hazırlanmıştı. şimdi bu formdatada sıra ile sorulara cevap vermesi gerekiyor.
// active step formdaki soru indexi. bu formda ileri geri gezinerek cevaplarını ilgili soruya kayıt ediyorum.
// en son gönderirken bu soruları çekip submit ediyorum.

/* ek açıklama
Component:   <QuestionType activeStep={activeStep} /> 
bir servise tıklandıktan sonra o servisin soruları çekildi. 
gelen sorular context'teki prepareFormData(data) fonksiyonu ile benim ayarladığım 
özel bir diziye sırasıyla eklendi. her servisin sonuna static sorular dediğimiz 
bütçe adres detay soruları eklendi. 
Bu komponent hazırladığım dizideki soruları activeStep indexsine göre sırasıyla gösterme 
işlemini yapıyor. dizide soru tipleri var bazı sorular radio bazıları select gibi tiplerde
geliyor. bu tiplere göre ilgili komponenti render edip ilgili soruyu propla geçiyor. 
*/
import { useContext } from 'react'
import ServiceContext from '../context/serviceContext'
import Duration from './form/Duration'
import {
  AddressInput,
  BudgetInput,
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
  WorkDetail,
} from './form'
import CanSeeNumber from './form/CanSeeNumber'
import Plus from './form/Plus'
const QuestionType = ({ activeStep }) => {
  const { formData } = useContext(ServiceContext)

  // Loading
  if (formData.lenght === 0) return <p>Loading</p>

  // Dynamic QuestionType
  if (formData[activeStep].question) {
    let type = formData[activeStep].type_id

    if (type === 6)
      return <RadioInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 5)
      return (
        <CheckboxInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 4)
      return <Plus data={formData[activeStep]} activeStep={activeStep} />
    if (type === 2)
      return <TextInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 1)
      return <SelectInput data={formData[activeStep]} activeStep={activeStep} />

    //Statics
    if (type === 'adress')
      return (
        <AddressInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 'duration')
      return <Duration data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'showBudget')
      return <BudgetInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'workDetail')
      return <WorkDetail data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'canSeeNumber')
      return (
        <CanSeeNumber data={formData[activeStep]} activeStep={activeStep} />
      )
  }
}

export default QuestionType
