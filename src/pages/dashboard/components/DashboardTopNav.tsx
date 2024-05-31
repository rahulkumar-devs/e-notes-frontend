import {ArrowLeft} from 'lucide-react'
import { Link } from 'react-router-dom'

const DashboardTopNav = () => {
  return (
    <div className=' py-2.5 dark:shadow-lg dark:border-b my-2'>
        <div className=' flex items-center gap-1.5'>
        <ArrowLeft />
            <Link to={"/"} className=' border-b-blue-500 dark:border-b-slate-200 '>Back to home</Link>
        </div>

    </div>
  )
}

export default DashboardTopNav