// blog verileri için /blog adresinde gösterilan içerik kartları
import { Link } from 'react-router-dom'

const BlogCard = ({ blogData }) => {
  return (
    <Link
      to={`/blog/${blogData.id}`}
      className="!min-h-[300px] w-full max-w-[400px] overflow-auto rounded-md bg-white p-4 dark:bg-dark-900 dark:text-light-50 md:!min-h-[500px] lg:h-[450px] lg:!w-[500px]"
    >
      <img
        src={blogData.image}
        className="rounded-md dark:bg-white"
        alt="blog_image_alt"
      />
      <div className="mt-4 flex flex-col gap-4">
        <h>{blogData.name}</h>
        <article className="line-clamp-3 ">{blogData.description}</article>
      </div>
    </Link>
  )
}

export default BlogCard
