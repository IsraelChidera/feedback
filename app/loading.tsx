import Image from "next/image";

export default function Loading() {
    return <section className="h-screen w-full flex items-center justify-center">
        <div>
            <Image className="animate-bounce" width={204} height={58} src="/logo.svg" alt="logo" />
        </div>
    </section>
}