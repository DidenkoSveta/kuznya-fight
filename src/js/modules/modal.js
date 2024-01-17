import gsap from 'gsap';

export default function modal() {
 // Элементы модального окна
 const modal = document.getElementById('modal');
 const modalOverlay = document.getElementById('modalOverlay');
 const closeModalButton = document.querySelector('.close-button');
 const modalButtons = document.querySelectorAll('.modal-btn');
 
 // Формы
 const enrollmentForm = document.getElementById('enrollmentForm');
 const contactForm = document.querySelector('.contact-form__form');
 
 // Чекбокс согласия модальной формы
 const consentCheckbox = document.getElementById('consent');

 // Функция для переключения модального окна
 const toggleModal = (show) => {
   gsap.to([modal, modalOverlay], { opacity: show ? 1 : 0, duration: 0.5, display: show ? 'block' : 'none' });
 };

 // Функция для отображения сообщения об успехе
 const showSuccessMessage = (message) => {
   const successMessage = document.createElement('div');
   successMessage.className = 'success-message';
   successMessage.textContent = message;
   document.body.appendChild(successMessage);
   gsap.to(successMessage, { opacity: 1, duration: 0.5 });

   // Удаление сообщения после 1 секунды
   setTimeout(() => {
     gsap.to(successMessage, {
       opacity: 0,
       duration: 0.5,
       onComplete: () => document.body.removeChild(successMessage)
     });
   }, 1000);
 };

 // Обработчики для открытия и закрытия модального окна
 if (modalButtons) {
   modalButtons.forEach(button => button.addEventListener('click', () => toggleModal(true)));
 }
 if (closeModalButton) {
   closeModalButton.addEventListener('click', () => toggleModal(false));
 }
 if (modalOverlay) {
   modalOverlay.addEventListener('click', () => toggleModal(false));
 }

 // Обработчик отправки для модальной формы
 if (enrollmentForm && consentCheckbox) {
   enrollmentForm.addEventListener('submit', (e) => {
     e.preventDefault();
     if (!consentCheckbox.checked) {
       alert('Пожалуйста, подтвердите согласие на обработку данных.');
       return;
     }

     // Отправка данных модальной формы
     const formData = new FormData(enrollmentForm);
     fetch('sendmail.php', {
       method: 'POST',
       body: formData,
     })
     .then(response => response.text())
     .then(text => {
       showSuccessMessage('Заявка отправлена!');
       toggleModal(false);
       enrollmentForm.reset();
     })
     .catch(error => {
       alert('Произошла ошибка: ' + error.message);
     });
   });
 }

 // Обработчик отправки для встроенной формы
 if (contactForm) {
   contactForm.addEventListener('submit', function(e) {
     e.preventDefault();

     // Проверяем чекбокс согласия встроенной формы
     const agreementCheckbox = contactForm.querySelector('input[type="checkbox"]');
     if (!agreementCheckbox.checked) {
       alert('Пожалуйста, подтвердите согласие на обработку данных.');
       return;
     }

     // Отправка данных встроенной формы
     const formData = new FormData(contactForm);
     fetch('sendmail.php', {
       method: 'POST',
       body: formData,
     })
     .then(response => response.text())
     .then(text => {
       showSuccessMessage('Заявка отправлена!');
       contactForm.reset();
     })
     .catch(error => {
       alert('Произошла ошибка: ' + error.message);
     });
   });
 }
}
