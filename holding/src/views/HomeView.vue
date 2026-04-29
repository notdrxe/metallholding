<template>
  <div class="home-page">
    <section class="section home-intro">
      <p class="eyebrow">ООО «ТК «Металл-Холдинг» · Владимир</p>
      <h1 class="home-title">Чёрный металлопрокат со склада и с заводов</h1>
      <p class="home-lead">
        Опт, мелкий опт и розница: арматура, балка, трубы, швеллер, лист — напрямую от ведущих металлургических
        комбинатов и с собственных складов. Доставка автомобильным и железнодорожным транспортом по России и Беларуси.
      </p>
    </section>

    <section class="section home">
      <div class="hero-grid hero-grid--maket">
        <article class="hero-card hero-card--image">
          <BrandImg
            loading="eager"
            :candidates="[...metallHoldingImageCandidates.heroMetal]"
            alt="Металлопродукция и отгрузка"
            img-class="hero-card__photo"
          />
          <div class="hero-card__scrim" />
          <div class="hero-card__body">
            <h2>Прямые поставки</h2>
            <p>
              Работаем с продукцией Северсталь, ММК, ЕВРАЗ, НЛМК, ОМК и других производителей — с понятным
              происхождением металла и полным комплектом документов.
            </p>
            <RouterLink class="accent-btn" to="/about">О компании</RouterLink>
          </div>
        </article>
        <article class="hero-card hero-card--image">
          <BrandImg
            loading="eager"
            :candidates="[...metallHoldingImageCandidates.heroWarehouse]"
            alt="Склад металлопроката"
            img-class="hero-card__photo"
          />
          <div class="hero-card__scrim" />
          <div class="hero-card__body">
            <h2>Склад в Владимире</h2>
            <p>
              Поддерживаем запас ходовых позиций и комплектуем заказы под ваш перечень: от подбора сортамента до отгрузки
              в оговоренные сроки.
            </p>
            <RouterLink class="accent-btn" to="/catalog">Каталог</RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="section stats-strip" aria-label="Ключевые показатели">
      <div class="stat-card">
        <span class="stat-card__value">29+</span>
        <span class="stat-card__label">лет на рынке Владимирской области</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">1996</span>
        <span class="stat-card__label">год начала работы с металлопрокатом</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">3</span>
        <span class="stat-card__label">складских площадки в городе</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">РФ · РБ</span>
        <span class="stat-card__label">организация доставки по регионам</span>
      </div>
    </section>

    <section class="section services-section" aria-labelledby="services-title">
      <div class="section-head">
        <h2 id="services-title" class="section-head__title">Чем полезны клиентам</h2>
        <p class="section-head__text">
          От строительных бригад до промышленных предприятий — помогаем закрыть потребность в металле без лишней суеты.
        </p>
      </div>
      <div class="services-grid">
        <article class="service-card">
          <span class="service-card__icon" aria-hidden="true">◆</span>
          <h3>Подбор и консультация</h3>
          <p>Поможем сопоставить марки, сортамент и объёмы с вашим ТЗ и сроками производства работ.</p>
        </article>
        <article class="service-card">
          <span class="service-card__icon" aria-hidden="true">◇</span>
          <h3>Склад и отгрузка</h3>
          <p>Собственные склады на Производственной, Почаевском и Промышленном проездах — самовывоз и отгрузка партиями.</p>
        </article>
        <article class="service-card">
          <span class="service-card__icon" aria-hidden="true">◎</span>
          <h3>Логистика</h3>
          <p>Организуем поставку автомобильным и железнодорожным транспортом в рамках вашего маршрута.</p>
        </article>
        <article class="service-card">
          <span class="service-card__icon" aria-hidden="true">▣</span>
          <h3>Документы</h3>
          <p>Сертификаты качества и отгрузочные документы — под требования госзаказа, стройки и производства.</p>
        </article>
      </div>
    </section>

    <section class="section trust-panel">
      <div class="trust-panel__inner">
        <div>
          <h2 class="trust-panel__title">Партнёрская сеть</h2>
          <p class="trust-panel__text">
            Многолетние договорённости с металлургическими комбинатами позволяют держать конкурентные цены и стабильные
            сроки. Ассортимент охватывает сортовой и фасонный прокат, трубы ВГП и электросварные, листовой прокат,
            металлопрофиль и типовые профили.
          </p>
        </div>
        <ul class="trust-chips" aria-label="Примеры производителей">
          <li>Северсталь</li>
          <li>ММК</li>
          <li>ЕВРАЗ</li>
          <li>НЛМК</li>
          <li>ОМК</li>
        </ul>
      </div>
    </section>

    <section class="section facts-section" aria-labelledby="facts-title">
      <div class="section-head section-head--compact">
        <h2 id="facts-title" class="section-head__title">Интересные факты</h2>
        <p class="section-head__text">Коротко о том, как устроены поставки и почему клиенты заказывают снова.</p>
      </div>
      <div class="facts-carousel">
        <button
          type="button"
          class="facts-nav facts-nav--prev"
          aria-label="Предыдущий слайд"
          @click="prevSlide"
        >
          ‹
        </button>
        <div class="facts-slide facts-slide--img">
          <BrandImg
            :key="`fact-slide-${slideIndex}`"
            loading="eager"
            :candidates="activeSlide.candidates"
            :alt="activeSlide.title"
            img-class="facts-slide__photo"
          />
          <div class="facts-slide__overlay" />
          <div class="facts-slide__content">
            <h3>{{ activeSlide.title }}</h3>
            <p>{{ activeSlide.text }}</p>
          </div>
        </div>
        <button type="button" class="facts-nav facts-nav--next" aria-label="Следующий слайд" @click="nextSlide">
          ›
        </button>
        <div class="facts-dots" role="tablist" aria-label="Выбор слайда">
          <button
            v-for="(_, idx) in slideDescriptors"
            :key="idx"
            type="button"
            class="facts-dot"
            :class="{ 'facts-dot--active': idx === slideIndex }"
            :aria-label="`Слайд ${idx + 1}`"
            :aria-current="idx === slideIndex ? 'true' : undefined"
            @click="slideIndex = idx"
          />
        </div>
      </div>
    </section>

    <section class="section cta-ribbon">
      <div class="cta-ribbon__text">
        <h2>Нужен расчёт по перечню?</h2>
        <p>Позвоните или оформите заявку через корзину — сверим наличие, альтернативы и сроки.</p>
      </div>
      <div class="cta-ribbon__actions">
        <a class="accent-btn accent-btn--ghost" :href="`tel:${brandContacts.phoneTel}`">
          {{ brandContacts.phone }}
        </a>
        <RouterLink class="accent-btn accent-btn--outline" to="/about">
          О компании
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BrandImg from '@/components/BrandImg.vue'
import { brandContacts, metallHoldingImageCandidates } from '@/constants/brand'

const slideDescriptors = [
  {
    candidates: [...metallHoldingImageCandidates.factProducers],
    title: 'Производители и происхождение металла',
    text:
      'Поставляем продукцию с заводов-изготовителей и со складских запасов — с сертификатами и ведением отгрузочной документации.',
  },
  {
    candidates: [...metallHoldingImageCandidates.factLogistics],
    title: 'От склада до объекта',
    text:
      'Комплектуем заказы под доставку: подбираем загрузку, способ отгрузки и маршрут — от автотранспорта до ж/д отправок.',
  },
  {
    candidates: [...metallHoldingImageCandidates.factIndustry],
    title: 'Промышленность и строительство',
    text:
      'Обеспечиваем металлом производственные линии, ГОКи, машиностроение и гражданское строительство — с фокусом на повторные поставки.',
  },
]

const slideIndex = ref(0)

const activeSlide = computed(() => slideDescriptors[slideIndex.value]!)

function nextSlide() {
  slideIndex.value = (slideIndex.value + 1) % slideDescriptors.length
}

function prevSlide() {
  slideIndex.value = (slideIndex.value - 1 + slideDescriptors.length) % slideDescriptors.length
}
</script>
