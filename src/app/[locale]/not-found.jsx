import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4">Sahifa topilmadi</p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
                Bosh sahifaga qaytish
            </Link>
        </div>
    );
}