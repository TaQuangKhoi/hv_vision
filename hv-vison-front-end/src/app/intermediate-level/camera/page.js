'use client';

import {useEffect, useState} from "react";
import {toast} from "react-toastify";

function CvImage({src}) {
    return <img src={src}
                className="w-[960px] h-[540px] !object-contain rounded-[10px]" id="image"
    />
}

export default function CameraPage() {
    let apiEndpoint = process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN ? process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN : 'http://127.0.0.1:8000'

    const [imageSrc, setImageSrc] = useState('/when-no-image.png')

    const [isStop, setIsStop] = useState(false)

    useEffect(() => {
        if (!isStop) {
            // setInterval(() => {
            //     fetch(apiEndpoint + '/camera/video/', {}).then(response => {
            //         let status = response.status
            //         if (status === 200) {
            //             if (imageSrc === '/when-no-image.png') {
            //                 setImageSrc(apiEndpoint + '/camera/video/')
            //             }
            //         }
            //     }).catch(error => {
            //         setImageSrc('/when-no-image.png')
            //     })
            // }, 2000)
        }
    }, []);

    return <>
        <button onClick={
            () => {
                if (isStop) {
                    setIsStop(false)
                } else {
                    setIsStop(true)
                }
            }}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            Stop
        </button>

        <button onClick={() => setImageSrc(apiEndpoint + '/camera/video/')}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            Normal
        </button>

        <button onClick={() => setImageSrc(apiEndpoint + '/camera/gray/')}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            Gray
        </button>

        <div className="w-[960px] h-[540px] m-auto rounded-[10px] border-[#0a53be] border-2">
            <CvImage src={imageSrc}/>
        </div>
    </>
}