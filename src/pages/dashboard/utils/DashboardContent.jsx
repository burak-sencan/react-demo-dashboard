const DashboardContent = ({ children }) => {
  return (
    <div className="h-full overflow-auto lg:p-4">
      <div className="flex  min-h-[100%] flex-col justify-between gap-8 rounded-md bg-light-50 py-4 px-2 dark:bg-dark-800 lg:p-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardContent
