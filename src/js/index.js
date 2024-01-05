import '../scss/style.scss'; // Путь к файлу стилей

// Импорт функций из модулей
import burgerMenu from './modules/burger-menu';
import schedule from './modules/schedule';

// Использование функций после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  burgerMenu();
  schedule();


});