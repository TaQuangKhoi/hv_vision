import Link from "next/link";

export default function IntermediatePage() {
    return (
        <main>
            <div className="flex justify-center items-center text-center text-2xl min-h-[100vh]">
                <Link href={'intermediate-level/camera'}>
                    Camera
                </Link>
            </div>
        </main>
    )
}