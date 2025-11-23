import axios from 'axios';
import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa6";

const FocusPlayer = () => {
    const [IsLink, setIsLink] = useState<string>("");
    const [Playlist_Id, setPlaylist_Id] = useState<string>("");
    const [Video_Id, setVideo_Id] = useState<string>("");
    const [MetaData, setMetaData] = useState<any>({});
    const [IsContent, setIsContent] = useState<boolean>(false);


    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLink(e.target.value)
    }

    const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    const handleValidateLink = (link: string) => {
        const isValid = YOUTUBE_REGEX.test(link)
        return isValid;
    }

    const handleLinkType = (link: string) => {
        if (link.includes("list")) {
            console.log("this is playlist link");
        } else {
            console.log("this is video link");
        }
    }

    const handleExtract_Ids = (link: string) => {
        try {
            const url = new URL(link);

            const playListid = url.searchParams.get("list");
            if (playListid) {
                setPlaylist_Id(playListid);
                setVideo_Id("");
                console.log("playlist link", playListid);
                return;
            }

            let videoId = null;

            videoId = url.searchParams.get("v");

            if (!videoId && url.hostname === "youtu.be") {
                videoId = url.pathname.slice(1);
            }

            if (!videoId && url.pathname.includes("/shorts/")) {
                videoId = url.pathname.split("/shorts/")[1];
            }

            if (videoId) {
                setVideo_Id(videoId);
                setPlaylist_Id("");
                console.log("video link : ", videoId);
                return;
            }

            console.log("Invalid YouTube link");
        } catch (error) {
            console.log("Invalid URL format");
        }

    }

    const GetMetaData = async (link: string) => {
        if (!link || link.trim() === "") {
            console.log("No link provided");
            alert("no link provided")
            return;
        }
        if (!handleValidateLink(link)) {
            console.log("Invalid YouTube link");
            alert("link is not valid")
            return;
        }

        if (!handleValidateLink(link)) return
        try {
            const response = await axios.post(`http://localhost:8000/api/metadata`, {
                "Url": link.trim()
            })
            setMetaData(response.data)
        } catch (error) {
            console.log("error in fetching metadataa : ", error)
        }
    }

    const handleAllOperations = (link: string) => {
        if (!link) {
            alert("please provide link first");
            return;
        }
        if (link) {
            handleValidateLink(link)
            handleLinkType(link)
            handleExtract_Ids(link);
            GetMetaData(link);
            setIsContent(true)
        }
    }

    return (
        <>
            {IsContent === true ? (
                <div className='w-full overflow-y-auto'>
                    {Video_Id && (
                        <div className='w-full flex justify-center'>
                            <iframe
                                width="100%"
                                height="420"
                                src={`https://www.youtube.com/embed/${Video_Id}`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="max-w-3xl rounded-xl shadow-xl"
                            ></iframe>
                        </div>
                    )}

                    {Playlist_Id && (
                        <div className='w-full flex justify-center'>
                            <iframe
                                width='100%'
                                height="420"
                                src={`https://www.youtube.com/embed?listType=playlist&list=${Playlist_Id}`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className=" rounded-xl shadow-sm"
                            ></iframe>
                        </div>
                    )}


                    <div className='mt-5 w-full'>
                        {MetaData && Object.keys(MetaData).length > 0 && (
                            <div className='border p-3 rounded-xl border-gray-200 shadow-sm'>
                                {Object.entries(MetaData).map(([key, value]) => (
                                    <div key={key} className='flex gap-2'>
                                        <p className='font-medium'>{key} :</p>
                                        <div className='flex flex-wrap'>
                                            <p className='font-medium'>{String(value)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}
                    </div>

                </div>

            ) : (
                <div className='w-full flex gap-5 items-center'>
                    <div className='flex items-center gap-2 w-[80%] '>
                        <div className='border border-gray-400 shadow-sm h-10 w-full rounded-xl'>
                            <input type="text" value={IsLink} onChange={handleLinkChange} placeholder='Enter Your video/playlist link' className='h-full w-full rounded-xl outline-none px-3 font-medium' onKeyDown={(e) => e.key == "Enter" && console.log(IsLink)} required />
                        </div>

                        <div className={`h-5 w-5 border rounded-full flex justify-center items-center ${handleValidateLink(IsLink) === true ? "border-green-500" : "border-gray-400"}`}><FaCheck className={`h-3 w-3 ${handleValidateLink(IsLink) === true ? "text-green-500" : "text-gray-400"}`} /></div>
                    </div>

                    <button className='shadow-sm hover:shadow-md hover:bg-blue-300 hover:text-black text-white  cursor-pointer rounded-xl px-3 py-1 font-medium transition-all duration-300 bg-gray-500
                    ' onClick={() => handleAllOperations(IsLink)}>Get data</button>
                </div>
            )}


        </>
    )
}

export default FocusPlayer
