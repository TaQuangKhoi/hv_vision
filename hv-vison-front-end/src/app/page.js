'use client';

import Link from "next/link";

function LevelCard({level, href, animation}) {
    return (
        <Link href={href}
            className={'flex flex-col justify-center border border-black rounded m-4 grow place-self-stretch ' + animation}>
            <p className="text-center">
                {level}
            </p>
        </Link>
    )
}

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-stretch">
            <LevelCard level="Beginner level" href={'/beginner-level'}
                       animation={'hover:bg-green-300 hover:-translate-y-3 delay-75 duration-300'}/>


            <LevelCard level="Intermediate level" href={'/intermediate-level'}
                       animation={'hover:bg-yellow-300 hover:-translate-y-3 delay-75 duration-300'}/>

            <LevelCard level="Advanced level" href={'/advanced-level'}
                       animation={'hover:bg-red-300 hover:-translate-y-3 delay-75 duration-300'}/>
        </main>
    )
}
