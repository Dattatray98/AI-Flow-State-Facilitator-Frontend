import { useState } from "react"
import { data } from "../data/Paragraph.data"
import { contentFilter } from "../data/ContenteContainer.data";
import FocusPlayer from "./FocusPlayer";

const Paragraph = () => {
    const [subjectId, setSubjectId] = useState<number | null>(null);
    const [IsContenttype, setIsContenttype] = useState<number | null>(1);

    return (
        <div className=" p-5 w-[50%]">
            <div className="flex justify-between items-center gap-3 h-17 px-5 py-2 mb-5 border-b-2 border-gray-300">
                {contentFilter.map((conItem) => (
                    <div key={conItem.id} onClick={() => setIsContenttype(conItem.id)} className={`${IsContenttype === conItem.id ? " border border-gray-200 text-white shadow-sm rounded-xl bg-gray-500" : "border border-gray-500 "} h-10 rounded-xl flex items-center justify-center w-[50%] transition-all duration-500 cursor-pointer`}>
                        <p key={conItem.id} className="font-medium ">{conItem.label}</p>
                    </div>
                ))}
            </div>

            {IsContenttype === 2 ? (
                <div>
                    <div className="flex gap-5 justify-center p-2 border border-gray-200 shadow-sm rounded-xl h-15">
                        {data.map((item) => (
                            <button
                                onClick={() => setSubjectId(item.id)}
                                key={item.id}
                                className={`px-3 py-1 rounded-xl transition-all duration-300 ${subjectId === item.id ? 'bg-blue-300 text-gray-950 text-sm font-medium' : 'bg-gray-300 text-sm font-medium text-gray-700'}`}
                            >
                                {item.subject}

                            </button>
                        ))}
                    </div>
                    <div className=" p-2 flex flex-col gap-5">
                        {
                            subjectId !== null ?
                                data.filter(item => item.id === subjectId).map((item) => (

                                    <div key={item.id} className=" p-5 border border-gray-200 shadow-sm rounded-xl">
                                        <h1  className="text-xl  font-medium">{item.subject}</h1>
                                        <p  className="font-medium text-gray-700">{item.text}</p>
                                    </div>
                                )) :
                                <p>select a subject</p>
                        }
                    </div>
                </div>

            ) : (
                <div>
                   <FocusPlayer />
                </div>
            )}

        </div>
    )
}

export default Paragraph
