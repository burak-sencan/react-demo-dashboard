/*
Path: "/getBids/:id"
Component: <EmployeeShowMyGetBids/>
teklif verdiği ilanın detaylarının gösterildiği ekran. İlgili ilan detayı useParams ile ilan idsinin çekilerek daha sonra /employers/my_bids
 
*/

import DashboardContent from '../../utils/DashboardContent'
import { useParams } from 'react-router-dom'
import { Divider } from '@mui/material'
import TopNav from '../../utils/TopNav'

const EmployeeShowMyGetBids = () => {
  const { id } = useParams()

  return (
    <DashboardContent>
      <div>
        <TopNav url="/employeeDashboard/getBids" text="Kazandığım Teklifler" />

        <div className="m-2">
          <Divider />
        </div>
        <div>EmployeeShowMyGetBids {id}</div>
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowMyGetBids
