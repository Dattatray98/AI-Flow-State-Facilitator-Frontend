import { useFocusTracker } from "../hooks/useFocusTracker"
import FocusAsistant from "./FocusAsistant";
import { WiStars } from "react-icons/wi";
import FocusGraph from "./FocusGraph";
import { useState } from "react";
import EyeDetection from "./EyeDetection";
import { AiChatSwitch } from "../data/FocusAnalizer.data";


const FocusAnalyze = () => {
    const { timeSpent, showNotification } = useFocusTracker();
    const [IsFaceDetectionOn, setIsFaceDetectionOn] = useState(false);
    const [IsDistracted, setIsDistracted] = useState(false);
    const [ShowAnalizer, setShowAnalizer] = useState(false);
    const [AiSwitch, setAiSwitch] = useState<number>(1)
    const [Assistant, setAssistant] = useState("focus");


    const handleFaceDetectionToggle = () => {
        setIsFaceDetectionOn(!IsFaceDetectionOn);
    }

    const handleAnalizerToggle = () => {
        setShowAnalizer(!ShowAnalizer);
    }

    return (
        <div className='overflow-y-auto border-l-2 border-gray-300 w-[50%] h-[89vh]  p-5 flex flex-col gap-2'>
            <div className='p-2 flex justify-between'>
                <div className="w-[70%] flex gap-4">
                    <div className='border border-gray-200 shadow-sm font-medium py-2 px-4 rounded-xl flex justify-center items-center  '>
                        Status : {!IsDistracted ? "Focused" : "Distracted"}
                    </div>
                    <button onClick={handleAnalizerToggle} className={`border border-gray-200 shadow-sm px-3 py-2 font-medium rounded-xl flex justify-center items-center cursor-pointer transition-all duration-300 ${ShowAnalizer === true ? " bg-blue-400" : ""} `}>Show Analizer</button>
                    <div>
                        <button onClick={handleFaceDetectionToggle} className="border border-gray-200 shadow-sm px-3 py-2 font-medium rounded-xl flex justify-center items-center cursor-pointer ">Use Face Detection</button>
                    </div>
                </div>
                <div className='border border-gray-200 shadow-sm h-10 w-30 font-medium rounded-xl flex justify-center items-center '>{timeSpent}</div>

            </div>
            {IsFaceDetectionOn && (
                <div>
                    <EyeDetection setIsDistracted={setIsDistracted} />
                </div>
            )}

            {ShowAnalizer && (
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl font-medium text-gray-700 mb-3 mt-5 ">weekly Focus Analizer</h1>
                    <div className="w-[70vh]">
                        <FocusGraph />
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-2xl font-medium text-[#6a03af] mb-3 mt-5 flex gap-2 items-center"><WiStars className="h-8 w-8 mt-1" />AI Assistant</h1>
                <div className="w-[40%] mb-2 flex justify-evenly ">
                    {AiChatSwitch.map((AiItem) => (
                        <div key={AiItem.id} className={`px-3 ${AiSwitch == AiItem.id ? " border-b-2 border-gray-600 " : ""}`} onClick={() => { setAiSwitch(AiItem.id); setAssistant(AiItem.Assistant) }}>
                            <p className={`cursor-pointer ${AiSwitch == AiItem.id ? " font-medium" : " font-medium text-gray-600"}`}>{AiItem.label}</p>
                        </div>
                    ))}
                </div>
                <div className=" h-99 w-full">
                    <FocusAsistant Assistant={Assistant} />
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
