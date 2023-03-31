import './Loading.css'
const Loading = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex h-36 w-36 flex-col items-center justify-center gap-4 lg:h-48 lg:w-48">
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  )
}

export default Loading
