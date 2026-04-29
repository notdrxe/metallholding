<template>
  <div class="about-page">
    <section class="section about-hero">
      <div class="about-hero__grid">
        <div class="about-hero__copy">
          <p class="eyebrow">С 1996 года во Владимире</p>
          <h1 class="about-title">Металл-Холдинг — надёжные поставки металлопроката</h1>
          <p class="about-lead">
            ООО «ТК «Металл-Холдинг» специализируется на оптовой, мелкооптовой и розничной продаже чёрного металлопроката.
            Работаем с предприятиями, подрядчиками и частными заказчиками: от типовых позиций до нестандартных объёмов под заказ.
          </p>
          <ul class="about-highlights">
            <li>склады на три адреса во Владимире — удобная отгрузка и самовывоз;</li>
            <li>прямые поставки с комбинатов Северсталь, ММК, ЕВРАЗ, НЛМК, ОМК;</li>
            <li>доставка по России и Республике Беларусь автомобильным и ж/д транспортом.</li>
          </ul>
          <div class="about-hero__cta">
            <RouterLink class="accent-btn" to="/catalog">Перейти в каталог</RouterLink>
            <a class="accent-btn accent-btn--outline" :href="`tel:${brandContacts.phoneTel}`">
              {{ brandContacts.phone }}
            </a>
          </div>
        </div>
        <div class="about-hero__visual">
          <div class="about-hero__frame">
            <BrandImg
              loading="eager"
              :candidates="[...metallHoldingImageCandidates.heroWarehouse]"
              alt="Склад металлопродукции Металл-Холдинг"
              img-class="about-hero__img"
            />
          </div>
          <p class="about-hero__caption">
            Иллюстрации — из корпоративной медиатеки; при обновлении блоков возможна смена кадров.
          </p>
        </div>
      </div>
    </section>

    <section class="section about-numbers" aria-label="Цифры компании">
      <article class="number-tile">
        <h2>29+ лет</h2>
        <p>опыта работы с металлопрокатом на рынке Владимирской области — знаем, как закрывать срочные и крупные заявки.</p>
      </article>
      <article class="number-tile">
        <h2>Ассортимент</h2>
        <p>
          Арматура и проволока, двутавры и швеллеры, уголки и трубы (включая ВГП и электросварные), листовой и
          металлопрофиль — в том числе оцинкованные решения для кровли и фасадов.
        </p>
      </article>
      <article class="number-tile">
        <h2>Форматы</h2>
        <p>
          Работаем в опте, мелком опте и рознице: гибко комплектуем отгрузку под ваш бюджет, сроки и логистику.
        </p>
      </article>
    </section>

    <section class="section timeline-section" aria-labelledby="timeline-title">
      <div class="section-head section-head--compact">
        <h2 id="timeline-title" class="section-head__title">Как мы выстраиваем сотрудничество</h2>
        <p class="section-head__text">Понятный цикл от заявки до отгрузки — без скрытых условий.</p>
      </div>
      <ol class="timeline">
        <li class="timeline__step">
          <span class="timeline__n">1</span>
          <div>
            <h3>Заявка и уточнение</h3>
            <p>Собираем перечень позиций, объёмы, требования к сертификации и доставке.</p>
          </div>
        </li>
        <li class="timeline__step">
          <span class="timeline__n">2</span>
          <div>
            <h3>Коммерческое предложение</h3>
            <p>Согласуем цену, сроки отгрузки и альтернативные марки при дефиците на складе.</p>
          </div>
        </li>
        <li class="timeline__step">
          <span class="timeline__n">3</span>
          <div>
            <h3>Резерв и документы</h3>
            <p>Формируем пакет по качеству и отгрузке — под вашу учётную политику и стройку.</p>
          </div>
        </li>
        <li class="timeline__step">
          <span class="timeline__n">4</span>
          <div>
            <h3>Отгрузка</h3>
            <p>Самовызов со складов во Владимире или доставка до вашей площадки выбранным перевозчиком.</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="section addresses-section" aria-labelledby="addr-title">
      <div class="section-head section-head--compact">
        <h2 id="addr-title" class="section-head__title">Склады и офис</h2>
        <p class="section-head__text">
          Центральный офис и складские площадки ниже. Актуальный график работы, пропуска и разгрузку уточняйте по телефону.
        </p>
      </div>
      <div class="address-cards">
        <article class="address-card">
          <h3>Центральный офис / склад №1</h3>
          <p>{{ brandContacts.addressMain }}</p>
        </article>
        <article class="address-card">
          <h3>Склад №2</h3>
          <p>г. Владимир, {{ brandContacts.addressWh2 }}</p>
        </article>
        <article class="address-card">
          <h3>Склад №3</h3>
          <p>г. Владимир, {{ brandContacts.addressWh3 }}</p>
        </article>
      </div>
    </section>

    <section class="section values-section" aria-labelledby="values-title">
      <div class="section-head section-head--compact">
        <h2 id="values-title" class="section-head__title">Почему клиенты остаются с нами</h2>
      </div>
      <div class="values-grid">
        <article class="value-card">
          <h3>Прозрачность</h3>
          <p>Честно говорим о наличии, сроках и альтернативах — чтобы вы могли планировать производство и монтаж.</p>
        </article>
        <article class="value-card">
          <h3>Скорость реакции</h3>
          <p>Оперативно пересчитываем заявки и держим связь до момента отгрузки.</p>
        </article>
        <article class="value-card">
          <h3>Учёт логистики</h3>
          <p>Помогаем с погрузочными схемами и оформлением при работе с транспортными компаниями и ж/д.</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BrandImg from '@/components/BrandImg.vue'
import { brandContacts, metallHoldingImageCandidates } from '@/constants/brand'
</script>
