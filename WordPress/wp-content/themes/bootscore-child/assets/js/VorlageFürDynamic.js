/* dynamicVorschauBild.js - Dynamisches Kontaktformular und Vorschaukarten */

// Dynamisches Kontaktformular initialisieren
function loadDynamicForms() {
    document.addEventListener('DOMContentLoaded', function () {
      const openFormButtons = document.querySelectorAll('.open-form-button2');
  
      openFormButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const card = button.closest('.card2');
          const formContainer = card.querySelector('.form-container2');
  
          // Schließe vorherige Formulare
          document.querySelectorAll('.contact-form2').forEach((form) => {
            form.parentElement.innerHTML = '';
          });
  
          // Dynamisches Formular hinzufügen
          const formHTML = `
            <div class="contact-form2">
              <form id="contactForm2_dynamic">
                <label for="email">Ihre E-Mail:</label>
                <input type="email" id="email" required>
                <label for="message">Ihre Nachricht:</label>
                <textarea id="message" required></textarea>
                <button type="submit">Senden</button>
              </form>
            </div>
          `;
          formContainer.innerHTML = formHTML;
  
          // Event-Listener für das dynamische Formular
          const form = formContainer.querySelector('#contactForm2_dynamic');
          form.addEventListener('submit', function (event) {
            event.preventDefault();
  
            // Formulardaten
            const email = form.querySelector('#email').value;
            const message = form.querySelector('#message').value;
  
            // AJAX-Aufruf
            fetch('/wp-content/themes/bootscore-child/form-handler.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  alert('Danke für Ihre Anfrage!');
                  form.reset();
                } else {
                  alert(data.message);
                }
              })
              .catch((error) => {
                alert('Es gab einen Fehler. Bitte später erneut versuchen.');
              });
          });
        });
      });
    });
  }
  
  // Initialisierung
  loadDynamicForms();
  