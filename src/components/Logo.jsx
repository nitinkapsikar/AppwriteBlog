import { FaBloggerB } from "react-icons/fa6";
import  {Link} from 'react-router-dom'
export default function Logo(){
    return(
        <>
        <Link className="font-pbold text-2xl flex justify-center items-center gap-2">
           <FaBloggerB className="text-orange-600"/>
            <span >Blogy</span> <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce"></span>
        </Link>
        </>
    )
}