import Link from "next/link";

export default function IntermediatePage() {
    return (
        <main className="flex flex-col justify-center items-center text-center text-2xl min-h-[100vh]">
            <Link href={'/'}
                  className="fixed z-90 top-10 left-8 w-20 h-20 rounded-full flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
            >
                <img src="https://cdn-icons-png.flaticon.com/512/7915/7915208.png"/>
            </Link>
            <Link href={'intermediate-level/camera'}>
                Outside Camera
            </Link>
            <Link href={'intermediate-level/webcam-on-client'}>
                Use your webcam
            </Link>
        </main>
    )
}