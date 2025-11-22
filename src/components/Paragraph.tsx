import { useState } from "react"
import { data } from "../data/paraData"

const Paragraph = () => {
    const [subjectId, setSubjectId] = useState<number | null>(null);

    return (
        <div className=" p-5 w-[50%]">
            <div className="flex gap-5 justify-center p-2 border border-gray-200 shadow-sm rounded-xl h-15">
                {data.map((item) => (
                    <button
                        key={item.id}
                        className={`px-3 py-1 rounded-xl transition-all duration-300 ${subjectId === item.id ? 'bg-blue-300 text-gray-950 text-sm font-medium' : 'bg-gray-300 text-sm font-medium text-gray-700'}`}
                        onClick={() => setSubjectId(item.id)}
                    >
                        {item.subject}
                    </button>
                ))}
            </div>

            <div className=" p-2 flex flex-col gap-5">
                {
                    subjectId ?
                        data.filter(item => item.id === subjectId).map((item) => (

                            <div key={item.id} className=" p-5 border border-gray-200 shadow-sm rounded-xl">
                                <h1 className="text-xl  font-medium">{item.subject}</h1>
                                <p className="font-medium text-gray-700">{item.text}</p>
                            </div>
                        )) :
                        <p>select a subject</p>
                }
            </div>

        </div>
    )
}

export default Paragraph
