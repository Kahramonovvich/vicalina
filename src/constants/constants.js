export const navMenu = [
    {
        id: 1,
        name: 'QOZONLAR',
        img: '/images/6a751b6c-5fdf-49ff-a579-569f09927146_removalai_preview 1.png'
    },
    {
        id: 2,
        name: 'SKAVAROTKALAR',
        img: '/images/image.png'
    },
    {
        id: 3,
        name: 'PICHOQLAR',
        img: '/images/0b1d2b30-53ce-427e-8ba8-f8aa0c07d604_removalai_preview.png'
    },
    {
        id: 4,
        name: 'OSHXONA NABORLAR',
        img: '/images/bf28ba1f-8a63-40a4-b13e-a8a7043563a6_removalai_preview.png'
    },
    {
        id: 5,
        name: 'QOSHIQLAR',
        img: '/images/Removal-173.png'
    },
    {
        id: 6,
        name: 'QOZON NABORLAR',
        img: '/images/3e7bd21f-49f7-4a75-8991-52fbce1c82d8_removalai_preview.png'
    },
    {
        id: 7,
        name: 'KASTRULKALAR',
        img: '/images/77f0b30b-c80c-47d8-85af-5cad6c6fb1ce_removalai_preview.png'
    },
    {
        id: 8,
        name: 'KASTRULKA NABORLAR',
        img: '/images/d0e72209-a575-4e6b-b491-205c49bbad48_removalai_preview.png'
    },
    {
        id: 9,
        name: 'KICHIK TURDAGI MAISHIY TEXNIKALAR',
        img: '/images/b4d960c6-7a30-4f52-867a-e05c9af37129_removalai_preview.png'
    },
    {
        id: 10,
        name: 'MANTIQASQONLAR',
        img: '/images/cb6c3fc9-7b39-4253-8580-4af06b3f6b50_removalai_preview.png'
    },
    {
        id: 11,
        name: 'BLINITSALAR',
        img: '/images/dfe31243-dc52-43c7-b65c-68f51569c285_removalai_preview.png'
    },
].map(item => ({
    ...item,
    slug: `/catalog/${item.name.toLowerCase().replace(/\s+/g, '-')}`
}));

export const carousel = [
    {
        id: 1,
        title: 'Siz izlagan oshxona jihozlari shu yerda!',
        subTitle: 'Bizning yuqori sifatli oshxona anjomlari bilan pishirish yanada oson va qulay bo‘ladi.',
        img: '/images/header-1.png',
        slug: '/catalog/qozonlar'
    },
    {
        id: 2,
        title: 'Siz izlagan oshxona jihozlari shu yerda!',
        subTitle: 'Bizning yuqori sifatli oshxona anjomlari bilan pishirish yanada oson va qulay bo‘ladi.',
        img: '/images/header-2.png',
        slug: '/catalog/qozonlar'
    },
];

export const products = [
    {
        id: 1,
        img: '',
        name: '',
        price: 0,
        newPrice: 0,
        discount: false,
        category: '',
        rating: {
            rate: 0,
            count: 0
        },
        shortDesc: '',
        fullDesc: '',
        weight: '',
        color: '',
        type: '',
        qty: 100,
        tages: '',
        brandImg: '',
        comments: [
            {
                clientName: '',
                clientComment: ''
            }
        ],
    },
];