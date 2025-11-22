import axios from "axios"
import { useEffect, useRef, useState } from "react"

interface Message {
    id: string;
    text: string;
    sender: "user" | "attenza";
}

const FocusAsistant = () => {
    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState<Message[]>([]);
    const [isTypeing, setIsTyping] = useState(false);


    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message, isTypeing]);


    const handleGenerate = async () => {
        if (!prompt) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: prompt,
            sender: "user",
        };

        setMessage((prev) => [...prev, userMessage]);
        setPrompt("");
        setIsTyping(true);

        try {
            const response = await axios.post("http://localhost:8000/api/attenza", { prompt: prompt })
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.response,
                sender: "attenza",
            };
            setMessage((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        } catch (error) {
            console.log("error : ", error);
            const aiMessage: Message = {
                id: (Date.now() + 2).toString(),
                text: "Sorry, something went wrong",
                sender: "attenza",
            };
            setMessage((prev) => [...prev, aiMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value)
    };


    return (
        <div className="h-full w-full border border-gray-200 shadow-sm rounded-xl relative bg-blue-50 flex flex-col">
            {/* Message container */}
            <div className="flex-1 overflow-y-auto space-y-2 p-5 ">
                {message.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`p-3 rounded-xl max-w-md ${msg.sender === 'user'
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTypeing && (
                    <div className="flex justify-start">
                        <div className="p-3 bg-gray-200 rounded-xl">
                            <div className="flex space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-500"></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messageEndRef} />
            </div>

            <div className="h-[20%] w-full border-t border-gray-200 bg-[#fffdf5] flex items-center justify-center gap-3 px-5 rounded-b-xl">
                <div className="border border-gray-300 shadow-sm h-10 w-[75%] rounded-xl">
                    <input
                        type="text"
                        className="flex-1 outline-none rounded-lg px-3 py-2 h-full w-full"
                        placeholder="Type message..."
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                </div>
                <button onClick={handleGenerate} className="border px-5 h-10 cursor-pointer rounded-xl text-lg font-medium hover:bg-blue-300">send</button>
            </div>
        </div>
    )
}

export default FocusAsistant
