import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { Tooltip } from '@mui/material'

const Blog = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <div>
      <div className="py-4">
        <Helmet>
          <title>Blog | Ev Tadilat, Tesisat ve Mobilya Hizmetleri</title>
          <meta
            name="description"
            content="Ev tadilatı, tesisat işleri, mobilya tamiratı ve montajı gibi hizmetler için aradığınız tüm ustalar burada! Hizmetlerimiz hakkında daha fazla bilgi alın."
          />
        </Helmet>
        <div className="w-full p-4  pl-8">
          <Link to="/">
            <Tooltip title="Anasayfa">
              <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
            </Tooltip>
          </Link>
        </div>
        <div className="inline-flex flex-wrap justify-center gap-8 p-4 pt-8 lg:px-16">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Blog
