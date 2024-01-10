import gsap from 'gsap';

export default function animations() {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  // Анимация заголовка и кнопки блока promo
  tl.from('.promo__title', { x: -100, opacity: 0, duration: 0.8 })
    .from('.promo-button', { x: -100, opacity: 0, duration: 0.8 }, '-=0.6'); // Запуск анимации кнопки на 0.2 секунды позже

  // Создание observer для остальных элементов
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Анимация для элементов, которые появляются в видимой части экрана
        gsap.fromTo(entry.target,
          { opacity: 0, y: 30 }, // начальное состояние
          { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' }
        );
        // Отмена наблюдения за элементом после начала анимации
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Наблюдение за элементами для запуска анимации
  const elementsToAnimate = document.querySelectorAll(' .services, .services__description, .about__container, .about__title, .advantages__container, .advantages__item, .schedule__container, .schedule__title, .pricing__container, .pricing__card, .pricing__title, .contact-form__container, .contact-form__title, .faq__container, .faq__title, .contact__container-info, .contact__title');
  elementsToAnimate.forEach(item => {
    // Начальное состояние элементов до анимации
    gsap.set(item, { opacity: 0, y: 30 });
    observer.observe(item);
  });

  // Анимация карточек .promo__features
  gsap.utils.toArray('.promo__feature').forEach((feature, index) => {
    tl.from(feature, {
      opacity: 0,
      y: -20 * (index + 1),
      duration: 0.6,
      stagger: 0.1,
      ease: 'power1.out'
    }, '-=0.5'); // Запуск анимации с задержкой, чтобы элементы появлялись один за другим сверху вниз
  });
}
