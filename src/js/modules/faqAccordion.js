// faq-accordion.js
function initFAQAccordion() {
   document.querySelectorAll('.faq__item').forEach(item => {
     const questionButton = item.querySelector('.faq__question');
     questionButton.addEventListener('click', () => {
       const answer = questionButton.nextElementSibling;
       answer.classList.toggle('open');
       questionButton.classList.toggle('active'); // Добавляем класс к кнопке при клике
     });
   });
 }
 
 export default initFAQAccordion;
 