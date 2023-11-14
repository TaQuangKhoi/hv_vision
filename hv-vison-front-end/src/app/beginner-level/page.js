'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import {data} from "autoprefixer";

export default function BeginnerPage() {
    const [imageUploadSrc, setImageUploadSrc] = useState('/when-no-image.png');
    const [imagePreviewSrc, setImagePreviewSrc] = useState('/when-no-image.png');
    const [cannyLoading, setCannyLoading] = useState(false);
    const [contoursLoading, setContoursLoading] = useState(false);

    let endpoint = process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN ? process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN : 'http://127.0.0.1:8000'

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
        let data = new FormData();
        data.append('file', input.files[0]);

        setCannyLoading(true)
        await fetch(endpoint + '/canny/create/', {
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
            console.error(error)
        })
    }

    async function contours() {
        let input = document.getElementById('imageInput');
        let data = new FormData();
        data.append('file', input.files[0]);

        setContoursLoading(true)
        await fetch(endpoint + '/contours/create/', {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json()
        }).then(data => {
            let json = JSON.parse(data)
            // setImageUploadSrc(json.imageUpload)
            setImagePreviewSrc(json.imagePreview)
            setContoursLoading(false)
        }).catch(error => {
            console.error(error)
        })
    }

    async function test() {
        await fetch(endpoint + '/canny/test/', {
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
            <div className="center-middle-screen flex justify-center items-center text-center min-h-[100vh]">
                <div onClick={uploadImage}
                     className="h-[500px] w-[500px] m-auto rounded-[10px] border-[#0a53be] border-2 hover:cursor-pointer">
                    <Image width={498} height={498} className={'h-[498px] w-[498px] !object-contain'}
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
                                            stroke-width="4"></circle>
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
                    <Image className={'h-[498px] w-[498px] !object-contain'}
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