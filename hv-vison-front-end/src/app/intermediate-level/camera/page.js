'use client';

import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiEndpoint from "@/django_api_endpoint";
import Link from "next/link";

function CvImage({src}) {
    return <img src={src}
                className="w-[960px] h-[540px] !object-contain rounded-[10px]" id="image"
    />
}

export default function CameraPage() {
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

    function updateRtmpUrl() {
        let rtmpUrl = document.getElementById('rtmp_url').value
        if (rtmpUrl === '') {
            toast.error('Please enter rtmp url')
            return
        }
        fetch(apiEndpoint + '/camera/rtmp_url/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rtmp_url: rtmpUrl
            })
        }).then(response => {
            let status = response.status
            if (status === 200) {
                toast.success('Update rtmp url successfully')
            } else {
                toast.error('Update rtmp url failed')
            }
        }).catch(error => {
            toast.error('Update rtmp url failed')
        })
    }


    return <main className="p-3">
        <Link href={'/intermediate-level'}
              className="mb-4 w-20 h-20 rounded-full flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
        >
            <img src="https://cdn-icons-png.flaticon.com/512/7915/7915208.png"/>
        </Link>

        <div className="grid gap-6 mb-6 grid-cols-2">
            <input type="text" id="rtmp_url" name="rtmp_url"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="rtmp://35.185.190.46/live/keios" required/>
            <button type="submit" onClick={updateRtmpUrl}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Update
            </button>
        </div>

        <button onClick={
            () => {
                setImageSrc('/when-no-image.png')
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

        <button onClick={() => setImageSrc(apiEndpoint + '/camera/face_detect/')}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            Faces detect
        </button>

        <div className="w-[960px] h-[540px] m-auto rounded-[10px] border-[#0a53be] border-2">
            <CvImage src={imageSrc}/>
        </div>
    </main>
}