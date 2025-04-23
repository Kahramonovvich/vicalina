'use client'

export default function TopBanner() {
    return (
        <div className="w-full bg-yellow-300 text-black py-2 overflow-hidden z-50">
            <div className="marquee whitespace-nowrap flex">
                <div className="marquee-content">
                    {Array(10).fill('Sayt test rejimida ishlamoqda!').map((text, i) => (
                        <span key={i} className="mx-4">{text}</span>
                    ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                    {Array(10).fill('Sayt test rejimida ishlamoqda!').map((text, i) => (
                        <span key={i} className="mx-4">{text}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}