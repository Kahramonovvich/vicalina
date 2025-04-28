'use client'

const translations = {
    uz: "Sayt test rejimida ishlamoqda!",
    ru: "Сайт работает в тестовом режиме!"
};

export default function TopBanner({ languageId }) {
    const text = Number(languageId) === 1 ? translations.uz : translations.ru;

    return (
        <div className="w-full bg-yellow-300 text-black py-2 overflow-hidden z-50">
            <div className="marquee whitespace-nowrap flex">
                <div className="marquee-content">
                    {Array(10).fill(text).map((item, i) => (
                        <span key={i} className="mx-4">{item}</span>
                    ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                    {Array(10).fill(text).map((item, i) => (
                        <span key={i} className="mx-4">{item}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};