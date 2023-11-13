'use client';

function LevelCard({level, animation, onClick}) {
    return (
        <div onClick={onClick}
            className={'flex flex-col justify-center border border-black rounded m-4 grow place-self-stretch ' + animation}>
            <p className="text-center">
                {level}
            </p>
        </div>
    )
}

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-stretch">
            <LevelCard level="Beginner level" onClick={() => alert('Beginner')}
                       animation={'hover:bg-green-300 hover:-translate-y-3 delay-75 duration-300'}/>


            <LevelCard level="Intermediate level" onClick={() => alert('Intermediate')}
                       animation={'hover:bg-yellow-300 hover:-translate-y-3 delay-75 duration-300'}/>

            <LevelCard level="Advanced level" onClick={() => alert('Advanced')}
                       animation={'hover:bg-red-300 hover:-translate-y-3 delay-75 duration-300'}/>
        </main>
    )
}
