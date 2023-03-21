import { Link } from 'react-router-dom'
import { logo } from '../assets'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider, Tooltip } from '@mui/material'
import Footer from '../components/Footer'

const BlogPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-2/3 flex-col gap-8 p-4 dark:text-light-50">
        <Link to="/blog">
          <Tooltip title="Blog">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Tooltip>
        </Link>
        <Divider />
        <h1>Header</h1>
        <article>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae commodi
          reiciendis, iure ea architecto autem? Similique nihil est consequuntur
          neque aliquam dolores, quo saepe quaerat doloribus quibusdam itaque,
          minus nesciunt ea amet quae vitae dolorem tempore ad voluptas
          molestias blanditiis possimus provident voluptate? Error magnam
          perferendis fugit, id praesentium cupiutem error voluptate quam
          perspiciatis ipsam accusantium laboriosam accusamus, nostrum impedit,
          magnam non deleniti est saepe ab corporis ad totam. Dolor id
          repellendus vitae sapiente possimus vel corporis tempora velit
          perferendis ratione in veritatis quod sequi quibusdam ad molestiae
          ipsum, impedit, reprehenderit ut. Illo odit illum reprehenderit beatae
          excepturi, repellat nostrum mollitia! Cum, eligendi!
        </article>
        <img src={logo} alt="" />
        <article>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae commodi
          reiciendis, iure ea architecto autem? Similique nihil est consequuntur
          neque aliquam dolores, quo saepe quaerat doloribus quibusdam itaque,
          minus nesciunt ea amet qore ad non! Dolores quos, debitis, minima
          laudantium repellat quae consectetur consequatur, magnam sunt odio
          quaerat a provident impedit nihil. Laudantium totam impedit, enim,
          dolorum odit dignissimos, reprehenderit aut nemo accusantium amet ad
          cumque fuga veritatis mollitia tempore! Autem error voluptate quam
          perspiciatis ipsam accusantium laboriosam accusamus, nostrum impedit,
          magnam non deleniti est saepe ab corporis ad totam. Dolor id
          repellendus vitae sapiente possimus vel corporis tempora velit
          perferendis ratione in veritatis quod sequi quibusdam ad molestiae
          ipsum, impedit, reprehenderit ut. Illo odit illum reprehenderit beatae
          excepturi, repellat nostrum mollitia! Cum, eligendi!
        </article>
        <article>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae commodi
          reiciendis, iure ea architecto autem? Similique nihil est consequuntur
          neque aliquam dolores, quo saepe quaerat doloribus quibusdam itaque,
          minus nesciunt ea amet qore ad non! Dolores quos, debitis, minima
          laudantium repellat quae consectetur consequatur, magnam sunt odio
          quaerat a provident impedit nihil. Laudantium totam impedit, enim,
          dolorum odit dignissimos, reprehenderit aut nemo accusantium amet ad
          cumque fuga veritatis mollitia tempore! Autem error voluptate quam
          perspiciatis ipsam accusantium laboriosam accusamus, nostrum impedit,
          magnam non deleniti est saepe ab corporis ad totam. Dolor id
          repellendus vitae sapiente possimus vel corporis tempora velit
          perferendis ratione in veritatis quod sequi quibusdam ad molestiae
          ipsum, impedit, reprehenderit ut. Illo odit illum reprehenderit beatae
          excepturi, repellat nostrum mollitia! Cum, eligendi!
        </article>
      </div>
      <Footer />
    </div>
  )
}

export default BlogPage
