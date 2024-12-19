/* 02Dez24 dynamicVorschauBild.js - Kontaktformular und Flip-Karten-Vorschau */

// Formularbereich für verschiedene Kategorien
function loadDynamicForms() {
  // Der Formularbereich wird beim Bedarf geladen
  document.addEventListener('DOMContentLoaded', function () {
    const openFormButtons = document.querySelectorAll('.open-form-button2');

    // Basis-Formularvorlage mit Feldern, die für alle Produkte gleich sind
    const baseFormTemplate = `
      <div class="contact-form2" style="display:block;">
        <form id="contactForm2_dynamic">
          <h3 class="formHeader">Anfrage</h3>
          <label class="fEmail2Label" for="fEmail2_dynamic">Ihre Adresse:</label>
          <input class="fEmailfeld2" type="email" id="fEmail2_dynamic" placeholder="name@example.com" required="">

          <label class="message2Label" for="message2_dynamic">Ihre Anfrage:</label>
          <textarea class="fTextarea2" id="message2_dynamic" rows="2"></textarea>
        </form>
      </div>
    `;

    openFormButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const card = button.closest('.card2');
        const formContainer = card.querySelector('.form-container2');

        // Schließe vorhandene offene Formulare, bevor ein neues geöffnet wird
        document.querySelectorAll('.contact-form2').forEach((form) => {
          if (form !== formContainer.querySelector('.contact-form2')) {
            form.parentElement.innerHTML = ''; // Entferne das bestehende Formular vollständig
          }
        });

        // Prüfen, ob das Formular bereits existiert - Neues Formular hinzufügen
        if (!formContainer.querySelector('.contact-form2')) {
          // Setze die Basis-Formularvorlage
          formContainer.innerHTML = baseFormTemplate;

          // Dynamische Anpassungen basierend auf der Karte
          const form = formContainer.querySelector('form');
          const cardTitle = card.querySelector('.card-title2').textContent;
          const formHeader = form.querySelector('.formHeader');
          formHeader.textContent = `Anfrage zu ${cardTitle}`;

          // Dynamische Felder basierend auf dem Produkttyp
          if (cardTitle === "Visitenkarten") {
            form.innerHTML += `
              <div class="fPapier">
                <label for="fPapier2_dynamic" class="fPapierLabel2">Papier:</label>
                <input type="text" id="fPapier2_dynamic" class="fPapierInput2" placeholder="z.B. Invercote 300gr.">
              </div>
              <div class="fDruck">
                <label for="fDruck2" class="fDruckLabel2">Druck:</label>
                <select id="fDruck2" class="fDruckInput2">
                    <option value="4/4-farbig">4/4-farbig</option>
                    <option value="4/1-farbig">4/1-farbig</option>
                    <option value="4/0-farbig">4/0-farbig</option>
                    <option value="1/0-farbig">1/0-farbig</option>
                    <option value="1/1-farbig">1/1-farbig</option>
                </select>
              </div>
              <div class="fFarbe">
              <label for="fFarbe2" class="fFarbeLabel2">Farbe:</label>
              <select id="fFarbe2" class="fFarbeInput2">
                  <option value="Euroskala (CMYK)">Euroskala (CMYK)</option>
                  <option value="Sonderfarbe">Sonderfarbe</option>
              </select>
              </div>
              <div class="fVeredelung">
              <label for="fVeredelung2" class="fVeredelungLabel2">Veredelung:</label>
              <input type="text" id="fVeredelung2" class="fVeredelungInput2" placeholder="z.B. Heißprägung">
              </div>
          `;
          }

          // Zustimmung und Buttons und Datei-Upload hinzufügen
          form.innerHTML += `
              <div class="fAuflage">
                  <label for="fAuflage2" class="fAuflageLabel2">Auflage:</label>
                  <input type="number" id="fAuflage2" class="fAuflageInput2" placeholder="Bitte Menge eingeben">
              </div>
              <div class="button-container2">
                  <button type="submit" class="submit-button2">Senden</button>
                  <button type="button" class="contact-button2">Anfrage abbrechen</button>
              </div>
          `;

          // Formular-Interaktionen definieren
          const contactForm = formContainer.querySelector('.contact-form2');
          const submitButton = form.querySelector('.submit-button2');

          submitButton.addEventListener('click', function (event) {
              event.preventDefault();

              const formData = new FormData(form);
              formData.append('action', 'send_dynamic_form');

              fetch(contactFormSettings.ajaxUrl, {
                  method: 'POST',
                  body: formData
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      form.reset();
                      showToast('Anfrage erfolgreich gesendet.', 'success');
                      contactForm.classList.add('slide-out-elliptic-left-fwd-normal');
                      contactForm.addEventListener('animationend', () => {
                          formContainer.innerHTML = '';
                      });
                  } else {
                      showToast('Ein Fehler ist aufgetreten.', 'error');
                  }
              })
              .catch(() => showToast('Ein unerwarteter Fehler ist aufgetreten.', 'error'));
          });
        }
      });
    });
  });
}

// === Toast-Nachrichten Funktion ===
function showToast(message, type) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '10px';
  toast.style.borderRadius = '5px';
  toast.style.color = 'white';
  toast.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
  toast.style.zIndex = '1000';

  document.body.appendChild(toast);

  setTimeout(() => {
      toast.remove();
  }, 5000);
}

// Initialisierung
loadDynamicForms();
