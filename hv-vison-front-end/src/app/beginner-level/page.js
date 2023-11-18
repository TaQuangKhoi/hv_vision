'use client';

import Image from "next/image";
import {useState} from "react";
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import apiEndpoint from "@/django_api_endpoint";

export default function BeginnerPage() {
    const [imageUploadSrc, setImageUploadSrc] = useState('/when-no-image.png');
    const [imagePreviewSrc, setImagePreviewSrc] = useState('/when-no-image.png');
    const [cannyLoading, setCannyLoading] = useState(false);
    const [contoursLoading, setContoursLoading] = useState(false);

    const router = useRouter()

    function uploadImage() {
        const imageInput = document.getElementById('imageInput');
        imageInput.click();

        imageInput.addEventListener("change", function () {
            let image = imageInput.files[0]
            setImageUploadSrc(URL.createObjectURL(image));
        });
    }

    async function canny() {
        let input = document.getElementById('imageInput');

        if (!input.files[0]) {
            toast("Please choose an image")
            return
        }

        let data = new FormData();
        data.append('file', input.files[0]);

        setCannyLoading(true)
        await fetch(apiEndpoint + '/canny/create/', {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json()
        }).then(data => {
            let json = JSON.parse(data)
            // setImageUploadSrc(json.imageUpload)
            setImagePreviewSrc(json.imagePreview)
            setCannyLoading(false)
        }).catch(error => {
            toast("Can't send image to server")
            setCannyLoading(false)
        })
    }

    async function contours() {
        let input = document.getElementById('imageInput');

        if (!input.files[0]) {
            toast("Please choose an image")
            return
        }

        let data = new FormData();
        data.append('file', input.files[0]);

        setContoursLoading(true)
        await fetch(apiEndpoint + '/contours/create/', {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json()
        }).then(data => {
            let json = JSON.parse(data)
            setImagePreviewSrc(json.imagePreview)
            setContoursLoading(false)
        }).catch(error => {
            toast("Can't send image to server")
            setContoursLoading(false)
        })
    }

    async function test() {
        await fetch(apiEndpoint + '/canny/test/', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Hảo"
            })
        }).then(response => {
            console.debug(response)
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <main>
            <Link href={'/'}
                    className="fixed z-90 top-10 left-8 w-20 h-20 rounded-full flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
            >
                <img src="https://cdn-icons-png.flaticon.com/512/7915/7915208.png"/>
            </Link>
            <div
                className="flex sm:flex-col md:flex-col lg:flex-row  justify-center items-center text-center min-h-[100vh]">
                <div
                    className="h-[500px] w-[500px] m-auto rounded-[10px] border-[#0a53be] border-2 hover:cursor-pointer"
                    onClick={uploadImage}>
                    <Image width={498} height={498} className={'h-[498px] w-[498px] !object-contain rounded-[10px]'}
                           src={imageUploadSrc} id="image-upload" alt="Ảnh Hảo Upload"/>
                </div>
                <ul>
                    <li>
                        <button onClick={canny}
                                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                type="button" id="canny-submit-button">
                            {cannyLoading ?
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"
                                     aria-hidden={cannyLoading}>
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                : ''}
                            Canny
                        </button>
                    </li>
                    <li>
                        <button onClick={contours}
                                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                type="button" id="contours-submit-button">
                            {contoursLoading ?
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"
                                     aria-hidden={cannyLoading}>
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                : ''}
                            Contours
                        </button>
                    </li>
                </ul>
                <div className="object-contain h-[500px] w-[500px] m-auto rounded-[10px] border-[#0a53be] border-2">
                    <Image className={'h-[498px] w-[498px] !object-contain rounded-[10px]'}
                           src={imagePreviewSrc} id="image-preview" alt="Ảnh Hảo Preview" width={498} height={498}/>
                </div>
            </div>
            <form action="" method="post" encType="multipart/form-data" id="form-file">
                <input hidden="hidden"
                       type="file"
                       name="imageInput"
                       id="imageInput"
                       accept="image/png, image/jpeg, image/jpg"
                />
            </form>
        </main>
    )
}