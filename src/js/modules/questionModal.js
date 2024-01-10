import gsap from 'gsap';

// Инициализация модального окна вопросов
export default function initQuestionModal() {
   const questionModal = document.getElementById('modalQuestion');
   const questionModalOverlay = document.querySelector('.question-overlay');
   const questionCloseButton = questionModal?.querySelector('.close-button');
   const questionForm = document.getElementById('questionForm');
   const questionButton = document.querySelector('.question-button');
 
   // Функция для переключения модального окна
   const toggleQuestionModal = (show) => {
     if (questionModal && questionModalOverlay) {
       gsap.to([questionModal, questionModalOverlay], {
         opacity: show ? 1 : 0,
         duration: 0.5,
         display: show ? 'block' : 'none'
       });
     }
   };
 
   // Обработчик для кнопки открытия модального окна вопросов
   questionButton?.addEventListener('click', (e) => {
     e.preventDefault();
     toggleQuestionModal(true);
   });
 
   // Обработчик для кнопки закрытия модального окна вопросов
   questionCloseButton?.addEventListener('click', () => {
     toggleQuestionModal(false);
   });
 
   // Обработчик для клика по оверлею
   questionModalOverlay?.addEventListener('click', () => {
     toggleQuestionModal(false);
   });
 
   // Обработчик отправки формы
   questionForm?.addEventListener('submit', (e) => {
     e.preventDefault();
     const consentCheckbox = questionForm.querySelector('#consent');
 
     if (!consentCheckbox.checked) {
       alert('Пожалуйста, подтвердите согласие на обработку данных.');
       return;
     }
 
     // Отправка данных формы (здесь должен быть ваш код AJAX или fetch)
 
     // Показываем сообщение об успехе
     const successMessage = document.createElement('div');
     successMessage.className = 'success-message';
     successMessage.textContent = 'Вы задали вопрос, мы на него обязательно ответим!';
     document.body.appendChild(successMessage);
     gsap.to(successMessage, { opacity: 1, duration: 0.5 });
 
     setTimeout(() => {
       gsap.to(successMessage, {
         opacity: 0,
         duration: 0.5,
         onComplete: () => document.body.removeChild(successMessage)
       });
       toggleQuestionModal(false); // Закрываем модальное окно
     }, 1000);
 
     questionForm.reset(); // Очистка формы
   });
}