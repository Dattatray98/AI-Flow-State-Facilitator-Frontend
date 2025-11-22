import { useFocusTracker } from "../hooks/useFocusTracker"
import FocusAsistant from "./FocusAsistant";
import { WiStars } from "react-icons/wi";
import FocusGraph from "./FocusGraph";

const FocusAnalyze = () => {
    const { timeSpent, isActive, showNotification } = useFocusTracker();
    return (
        <div className='overflow-y-auto border-l-2 border-gray-300 w-[50%] h-[89vh]  p-5 flex flex-col gap-2'>
            <div className='p-2 flex justify-between'>
                <div className='border border-gray-200 shadow-sm font-medium py-2 px-4 rounded-xl flex justify-center items-center  '>
                    Status : {isActive ? "Foused" : "Distracted"}
                </div>
                <div className='border border-gray-200 shadow-sm h-10 w-30 font-medium rounded-xl flex justify-center items-center '>{timeSpent}</div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className="text-2xl font-medium text-gray-700 mb-3 mt-5 ">weekly Focus Analizer</h1>
                <div className="w-[70vh]">
                    <FocusGraph />
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-medium text-[#6a03af] mb-3 mt-5 flex gap-2 items-center"><WiStars className="h-8 w-8 mt-1"/>AI Assistant</h1>
                <div className=" h-99 w-full">
                    <FocusAsistant />
                </div>
            </div>

            {showNotification && (
                <div className="notification p-3 bg-red-500 text-white rounded fixed top-5 right-5">
                    Come back! Focus on your reading.
                </div>
            )}
        </div>
    )
}

export default FocusAnalyze
