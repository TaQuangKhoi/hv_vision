'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {toast} from "react-toastify";
import axios from "axios";

function CvImage({src}) {
    return <img src={src}
                className="w-[960px] h-[540px] !object-contain rounded-[10px]" id="image"
    />
}

export default function CameraPage() {
    let apiEndpoint = process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN ? process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN : 'http://127.0.0.1:8000'

    const [imageSrc, setImageSrc] = useState(apiEndpoint + '/camera/video/')


    return <>
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