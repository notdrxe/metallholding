/** Базовый URL для абсолютных путей к медиа в BrandImg. При деплое на своём домене при необходимости замените на актуальный хост. */
const MEDIA_BASE = 'https://www.metall-holding.ru'
const MH = MEDIA_BASE.replace(/\/$/, '')

export const brandContacts = {
  phone: '(4922) 38-51-77',
  phoneTel: '+74922385177',
  city: 'Владимир',
  addressMain: '600033, Владимирская обл., г. Владимир, ул. Производственная, д. 2',
  addressWh2: '2-й Почаевский проезд, 18',
  addressWh3: 'Промышленный проезд, 32',
}

/** Кандидаты URL для иллюстраций (перебор до первой успешной загрузки). Пути можно обновить под структуру вашего хостинга. */
export const metallHoldingImageCandidates = {
  heroMetal: [
    MH + '/local/templates/aspro-allcorp/images/slider/slide01.jpg',
    MH + '/local/templates/aspro-allcorp2/images/slider/slide01.jpg',
    MH + '/upload/main/banner.jpg',
    'https://images.unsplash.com/photo-1581092160562-40aa08d2b206?w=1200&q=85&auto=format&fit=crop',
  ],
  heroWarehouse: [
    MH + '/local/templates/aspro-allcorp/images/slider/slide02.jpg',
    MH + '/local/templates/aspro-allcorp2/images/slider/slide02.jpg',
    MH + '/upload/main/sklad.jpg',
    'https://images.unsplash.com/photo-1504917556306-0f077b0c83b4?w=1200&q=85&auto=format&fit=crop',
  ],
  factProducers: [
    MH + '/upload/iblock/banner_producers.jpg',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=85&auto=format&fit=crop',
  ],
  factLogistics: [
    MH + '/upload/iblock/banner_logistics.jpg',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=85&auto=format&fit=crop',
  ],
  factIndustry: [
    MH + '/upload/iblock/banner_industry.jpg',
    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&q=85&auto=format&fit=crop',
  ],
} as const
