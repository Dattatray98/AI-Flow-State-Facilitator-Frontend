import { useFocusTracker } from "../hooks/useFocusTracker"
import FocusAsistant from "./FocusAsistant";

const FocusAnalyze = () => {
    const { timeSpent, isActive, showNotification } = useFocusTracker();
    return (
        <div className='border w-[50%] h-[93.4vh] p-5 flex flex-col gap-2'>
            <div className=' border h-20 p-2 flex justify-between'>
                <div className='border border-gray-200 shadow-sm h-10 w-30 rounded-xl flex justify-center items-center  '>
                    Status : {isActive ? "Foused" : "Distracted"}
                </div>
                <div className='border border-gray-200 shadow-sm h-10 w-30 rounded-xl flex justify-center items-center '>{timeSpent}</div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className="text-2xl font-medium text-gray-700">weekly Focus Analizer</h1>
                <div className="h-50 w-60 border">

                </div>
            </div>

            <div>
                <h1 className="text-2xl font-medium text-gray-700">AI Assistant</h1>
                <div className="border h-100 w-full">
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
