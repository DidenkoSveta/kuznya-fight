import '../scss/style.scss'; // Путь к файлу стилей

// Импорт функций из модулей
import burgerMenu from './modules/burger-menu';
import schedule from './modules/schedule';
import initFAQAccordion from './modules/faqAccordion';
import modal from './modules/modal';
import scroll from './modules/scroll-to-top';

// Использование функций после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  burgerMenu();
  schedule();
  initFAQAccordion();
  modal();
  scroll();
});