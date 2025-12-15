import { FaArrowRight } from "react-icons/fa";
import { clsx } from "clsx";

export default function LodingButton(
    {
        isLoding=false,
        type = 'submit',
        className="",
        text="Register"
    }
){
    return(
        <button type={type} disabled={isLoding} className={
            clsx(className,'w-full py-1 disabled:bg-gray-600 outline-none cursor-pointer disabled:cursor-auto transition-all duration-100 bg-btn hover:bg-btn-hover text-white flex justify-center items-center')}>
                <span>{text}</span>
                <FaArrowRight />
        </button>
    )

}