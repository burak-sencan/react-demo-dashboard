/*
Path: "/blog"
Component: <Blog/> 
Blog verilerinin cardlar halinde render edildiği ekran.
*/
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import BlogCard from '../components/BlogCard'
import Footer from '../components/Footer'
import api from '../context/api'
import Loading from '../components/Loading'
import TopNav from './dashboard/utils/TopNav'

const Blog = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    api.getBlogs().then((response) => {
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
    <div className="w-full">
      <div className="px-16 py-4">
        {/* Set html blog meta data */}
        <Helmet>
          <title>Blog | Ev Tadilat, Tesisat ve Mobilya Hizmetleri</title>
          <meta
            name="description"
            content="Ev tadilatı, tesisat işleri, mobilya tamiratı ve montajı gibi hizmetler için aradığınız tüm ustalar burada! Hizmetlerimiz hakkında daha fazla bilgi alın."
          />
        </Helmet>

        <TopNav url="/" text="Anasayfa" />
        <div className="inline-flex flex-wrap justify-center gap-8 p-4 pt-8 lg:px-16">
          {data.map((blogData) => (
            <BlogCard key={blogData.id} blogData={blogData} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog
