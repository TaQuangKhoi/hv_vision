'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import {data} from "autoprefixer";

export default function BeginnerPage() {
    const [imageUploadSrc, setImageUploadSrc] = useState('/when-no-image.png');
    const [imagePreviewSrc, setImagePreviewSrc] = useState('/when-no-image.png');

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

        let endpoint = process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN ? process.env.NEXT_PUBLIC_DJANGO_API_DOMAIN : 'http://127.0.0.1:8000'
        await fetch(endpoint + '/canny/create/', {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json()
        }).then(data => {
            let json = JSON.parse(data)
            // setImageUploadSrc(json.imageUpload)
            setImagePreviewSrc(json.imagePreview)
        }).catch(error => {
            console.error(error)
        })
    }

    function contours() {
        console.debug("contours-Khôi yêu Hảo")
    }

    async function test() {
        await fetch('http://127.0.0.1:8000/canny/test/', {
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
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                type="submit" id="canny-submit-button">
                            Canny
                        </button>
                    </li>
                    <li>
                        <button onClick={contours}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                type="submit" id="contours-submit-button">
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