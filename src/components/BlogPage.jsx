import { useEffect, useState } from 'react'
import { logo } from '../assets'
import Footer from '../components/Footer'
import TopNav from '../pages/dashboard/utils/TopNav'
import api from '../context/api'
import Loading from './Loading'
import { useParams } from 'react-router-dom'

const BlogPage = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    api.getBlog(id).then((response) => {
      if (response.data.result) {
        setData(response.data.result)
        const date = new Date(response.data.result.created_at)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        setFormattedDate(`${day}/${month}/${year}`)
      } else {
        setData([])
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-2/3 flex-col gap-8 p-4 dark:text-light-50">
        <TopNav url={'/blog'} text={'Blog'} />
        <h1>{data.name}</h1>
        <article>{data.description}</article>
        <img src={data.image} alt="blog_image_alt" />
        <article>{data.content}</article>
        <p>{formattedDate} tarihinde oluşturuldu.</p>
      </div>
      <Footer />
    </div>
  )
}

export default BlogPage
