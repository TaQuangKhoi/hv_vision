'use client';

import {useState} from "react";
import Image from "next/image";

export default function CameraPage() {
    const [videoSrc, setVideoSrc] = useState(null);

    let controller; // AbortController to stop the streaming
    // var h6 = document.getElementById('id_stream_writer');
    // $('#stop_stream').prop('disabled',true)

    async function startStreaming(url, onDataReceived, onError, onComplete) {
        try {
            const response = await fetch(url, {
                signal: controller.signal, // Attach the AbortSignal to the fetch request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const reader = response.body.getReader();

            while (true) {
                const {done, value} = await reader.read();

                if (done) {
                    // The stream has ended
                    onComplete();
                    break;
                }

                // Process the data chunk
                onDataReceived(value);
            }
        } catch (error) {
            onError(error);
        }
    }

    function startStream(url, onDataReceived, onError, onComplete) {
        controller = new AbortController(); // Create a new AbortController for each streaming session

        startStreaming(url, onDataReceived, onError, onComplete);
    }

    function stopStreaming() {
        if (controller) {
            // $('#exampleModal').modal('hide');
            // $('#stop_stream').prop('disabled',true)
            controller.abort(); // Abort the fetch request and stop the streaming
            controller = null;
        }
    }

    function onDataReceived(dataChunk) {
        let video = document.getElementById('video-player');

        video.pause();

        video.src = URL.createObjectURL(new Blob([dataChunk], {type: 'video/mp4'}));

        // play video
        // video.play();
    }

    function onError(error) {
        // Handle streaming error
        console.error('Error while streaming:', error);
    }

    function onComplete() {
        // Stream completed
        console.log('Streaming completed.');
    }


    // $('#start_stream').on('click',function(){
    //     console.log('Started...')
    //     $('#stop_stream').prop('disabled',false)
    //     h6.innerHTML = '<br>&#8226;&nbsp;';
    //     // Start streaming
    //     startStream(
    //         '{%url "generate_stream"%}',
    //         onDataReceived,
    //         onError,
    //         onComplete
    //     );
    // });


    // $('#stop_stream').on('click',function(){
    //     console.log('Stopping...')
    //     setTimeout(stopStreaming, 10000);
    //     $('#exampleModal').modal('show');
    // });

    function test() {
        console.log('Started...')
        // $('#stop_stream').prop('disabled', false)
        // h6.innerHTML = '<br>&#8226;&nbsp;';
        // Start streaming
        startStream(
            'https://haovan-19dab2764353.herokuapp.com/camera/video/',
            onDataReceived,
            onError,
            onComplete
        );
    }

    return <>
        <button onClick={test}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" id="canny-submit-button">
            Canny
        </button>
        <div
            className="w-[960px] h-[540px] m-auto rounded-[10px] border-[#0a53be] border-2">
            <img className="w-[960px] h-[540px] !object-contain rounded-[10px]"
                 src="https://haovan-19dab2764353.herokuapp.com/camera/video/"
            />
        </div>

    </>
}