'use client';

import CamScreen from "@/app/intermediate-level/webcam-on-client/cam-screen";
import apiEndpoint from "@/django_api_endpoint";
import {useState} from "react";

function NoCam() {
    return <div className="w-[720px] h-[540px] m-auto rounded-[10px] border-[#0a53be] border-2">
        No Cam
    </div>
}

export default function IntermediatePage() {
    const [isStopCam, setIsStopCam] = useState(false)

    return <main>
        <button onClick={
            () => isStopCam ? setIsStopCam(false) : setIsStopCam(true)
        }
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            {
                !isStopCam ? 'Stop' : 'Start'
            }
        </button>
        <div className="flex justify-between m-2">
            {
                !isStopCam ? <CamScreen/> : <NoCam/>
            }
            {
                !isStopCam ? <CamScreen/> : <NoCam/>
            }
        </div>
    </main>
}