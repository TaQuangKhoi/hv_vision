import Link from "next/link";

export default function IntermediatePage() {
    return (
        <main className="flex flex-col justify-center items-center text-center text-2xl min-h-[100vh]">
            <Link href={'intermediate-level/camera'}>
                Outside Camera
            </Link>
            <Link href={'intermediate-level/webcam-on-client'}>
                Use your webcam
            </Link>
        </main>
    )
}