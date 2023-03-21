import { Link } from 'react-router-dom'
import { logo } from '../assets'

const BlogCard = () => {
  return (
    <Link
      to="1"
      className="!min-h-[300px] w-full max-w-[400px] overflow-auto rounded-md bg-white p-4 dark:bg-dark-900 dark:text-light-50 md:!min-h-[500px] lg:h-[450px] lg:!w-[500px]"
    >
      <img src={logo} className="dark:bg-white rounded-md" alt="" />
      <div className="flex flex-col mt-4 gap-4">
        <h>Lizard</h>
        <article className="line-clamp-3 ">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across Lizards are a widespread group of squamate
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across Lizards are a widespread group of squamate
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across Lizards are a widespread group of squamate
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across Lizards are a widespread group of squamate
          reptiles, with over 6,000 species, ranging acro all continents except
          Antarctica
        </article>
      </div>
    </Link>
  )
}

export default BlogCard
