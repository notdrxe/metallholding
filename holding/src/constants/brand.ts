import heroMetalImg from '@/assets/images/beams.png'
import heroWarehouseImg from '@/assets/images/warehouse.png'
import factProducersImg from '@/assets/images/square-pipes.png'
import factLogisticsImg from '@/assets/images/round-pipes.png'
import factIndustryImg from '@/assets/images/warehouse.png' // or maybe beams again if no 5th image

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
  heroMetal: [heroMetalImg],
  heroWarehouse: [heroWarehouseImg],
  factProducers: [factProducersImg],
  factLogistics: [factLogisticsImg],
  factIndustry: [factIndustryImg],
} as const
