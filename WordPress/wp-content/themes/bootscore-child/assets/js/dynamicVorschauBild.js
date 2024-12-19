/* 02Dez24 dynamicVorschauBild.js - Kontaktformular und Flip-Karten-Vorschau */

// Formularbereich für verschiedene Kategorien
function loadDynamicForms() {
  // Der Formularbereich wird beim Bedarf geladen
  document.addEventListener('DOMContentLoaded', function() {
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
      button.addEventListener('click', function() {
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
          if (cardTitle === "Briefbogen") {
          form.innerHTML += `
              <div class="fPapier">
              <label for="fPapier2_dynamic" class="fPapierLabel2">Papier:</label>
              <input type="text" id="fPapier2_dynamic" class="fPapierInput2" placeholder="z.B. 90gr.">
              </div>
              <div class="fDruck">
              <label for="fDruck2" class="fDruckLabel2">Druck:</label>
              <select id="fDruck2" class="fDruckInput2">
                  <option value="4/4-farbig">4/4-farbig</option>
                  <option value="4/1-farbig">4/1-farbig</option>
                  <option value="4/0-farbig">4/0-farbig</option>
                  <option value="1/0-farbig">1/0-farbig</option>
                  <option value="1/1-farbig">1/1-farbig</option>
                  <option value="2/0-farbig">2/0-farbig</option>
                  <option value="2/2-farbig">2/2-farbig</option>
                  <option value="3/0-farbig">3/0-farbig</option>
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
          if (cardTitle === "Briefumschläge") {
          form.innerHTML += `
              <div class="fDruck">
              <label for="fDruck2" class="fDruckLabel2">Druck:</label>
              <select id="fDruck2" class="fDruckInput2">
                  <option value="4/4-farbig">4/4-farbig</option>
                  <option value="4/0-farbig">4/0-farbig</option>
              </select>
              </div>
              <div class="fFarbe">
              <label for="fFarbe2" class="fFarbeLabel2">Farbe:</label>
              <select id="fFarbe2" class="fFarbeInput2">
                  <option value="Euroskala (CMYK)">Euroskala (CMYK)</option>
              </select>
              </div>
              <div class="fVeredelung">
              <label for="fVeredelung2" class="fVeredelungLabel2">Veredelung:</label>
              <input type="text" id="fVeredelung2" class="fVeredelungInput2" placeholder="z.B. Heißprägung">
              </div>
          `;
          }
          if (cardTitle === "Durchschreibesätze") {
          form.innerHTML += `
              <div class="fDruck">
              <label for="fDruck2" class="fDruckLabel2">Druck:</label>
              <select id="fDruck2" class="fDruckInput2">
                  <option value="4/1-farbig">4/1-farbig</option>
                  <option value="4/0-farbig">4/0-farbig</option>
                  <option value="1/0-farbig">1/0-farbig</option>
                  <option value="1/1-farbig">1/1-farbig</option>
              </select>
              </div>
              <div class="fAusfuehrung">
              <label for="fAusfuehrung2" class="fAusfLabel2">Ausführung:</label>
              <select id="fAusfuehrung" class="fAusfInput2">
                  <option value="2-fach">2-fach</option>
                  <option value="3-fach">3-fach</option>
                  <option value="4-fach">4-fach</option>
              </select>
              </div>
              <div class="fFarbe">
              <label for="fFarbe2" class="fFarbeLabel2">Farbe:</label>
              <select id="fFarbe2" class="fFarbeInput2">
                  <option value="Euroskala (CMYK)">Euroskala (CMYK)</option>
                  <option value="Sonderfarbe">Sonderfarbe</option>
              </select>
              </div>
          `;
          }
          if (cardTitle === "Notizblöcke") {
          form.innerHTML += `
              <div class="fPapier">
              <label for="fPapier2_dynamic" class="fPapierLabel2">Papier:</label>
              <input type="text" id="fPapier2_dynamic" class="fPapierInput2" placeholder="z.B. 90gr.">
              </div>
              <div class="fDruck">
              <label for="fDruck2" class="fDruckLabel2">Druck:</label>
              <select id="fDruck2" class="fDruckInput2">
                  <option value="4/0-farbig">4/0-farbig</option>
              </select>
              </div>
              <div class="fFarbe">
              <label for="fFarbe2" class="fFarbeLabel2">Farbe:</label>
              <select id="fFarbe2" class="fFarbeInput2">
                  <option value="Euroskala (CMYK)">Euroskala (CMYK)</option>
              </select>
              </div>
          `;
          }
          if (cardTitle === "Mappen") {
          form.innerHTML += `
              <div class="fPapier">
              <label for="fPapier2_dynamic" class="fPapierLabel2">Papier:</label>
              <input type="text" id="fPapier2_dynamic" class="fPapierInput2" placeholder="z.B. Invercote 300gr.">
              </div>
              <div class="fDruck">
              <label for="fDruck2" class="fDruckLabel2">Druck:</label>
              <select id="fDruck2" class="fDruckInput2">
                  <option value="4/4-farbig">4/4-farbig</option>
                  <option value="4/0-farbig">4/0-farbig</option>
              </select>
              </div>
              <div class="fFarbe">
              <label for="fFarbe2" class="fFarbeLabel2">Farbe:</label>
              <select id="fFarbe2" class="fFarbeInput2">
                  <option value="Euroskala (CMYK)">Euroskala (CMYK)</option>
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
              <div class="fUpload">
                  <label class="datei2Label" for="labelDatei2">PDF-Datei verfügbar?</label>
                  <div class="fileUpload2Radios">
                      <label class="custom-radio">
                          <input type="radio" class="formFiledInputs2" name="fDatei" id="fDateiJa" value="ja">
                          <span class="radio-mark"></span> Ja
                      </label>
                      <label class="custom-radio">
                          <input type="radio" class="formFiledInputs2" name="fDatei" id="fDateiNein" value="nein" checked="">
                          <span class="radio-mark"></span> Nein
                      </label>
                  </div>
              </div>
              <div class="fileUploadContainer2" style="display:none;">
                  <label class="fHochladen" for="fUpload2">Bitte PDF hochladen:</label>
                  <input type="file" id="fUpload2" accept="application/pdf">
              </div>
              <div class="button-container2">
                  <button type="submit" class="submit-button2">Senden</button>
                  <button type="button" class="contact-button2">Anfrage abbrechen</button>
              </div>
              <div class="fZustimmung">
                  <label class="fZustimmungLabel2 custom-checkbox">
                      <input type="checkbox" id="fZustimmung2_dynamic" class="fZustimmungInput2" required="">
                      <span class="checkmark"></span>
                      Für die Absendung Ihrer Anfrage benötigen wir Ihre Zustimmung zu unserer
                      <a href="https://duruprint.de/datenschutzerklaerung/" target="_blank" style="color: #1CC4B6; font-weight: bold;">Datenschutzerklärung</a>.
                  </label>
              </div>
          `;

          // Formular-Interaktionen definieren
          // Handle file upload radio buttons toggle
        const fileRadioYes = form.querySelector('#fDateiJa');
        const fileRadioNo = form.querySelector('#fDateiNein');
        const fileUploadContainer = form.querySelector('.fileUploadContainer2');
        
        const toggleFileUpload = () => {
          const fileInput = fileUploadContainer.querySelector('#fUpload2');
          if (fileRadioYes.checked) {
            fileUploadContainer.style.display = 'block'; // Show the file upload container if "Yes" is selected
            fileInput.setAttribute('required', true); // Make the file input required
          } else {
            fileUploadContainer.style.display = 'none'; // Hide the file upload container if "No" is selected
            fileInput.removeAttribute('required'); // Remove the required attribute
          }
        };

        // Add change event listeners to the radio buttons for toggling file upload field
        fileRadioYes.addEventListener('change', toggleFileUpload);
        fileRadioNo.addEventListener('change', toggleFileUpload);
        toggleFileUpload(); // Call once to initialize the correct state

        // Formular absenden
        const contactForm = formContainer.querySelector('.contact-form2');
        const submitButton = form.querySelector('.submit-button2');
        const cancelButton = form.querySelector('.contact-button2');
        // Formular-Interaktionen definieren
        submitButton.addEventListener('click', function (event) {
          event.preventDefault();
          const fileInput = form.querySelector('#fUpload2');
          if (fileRadioYes.checked && !fileInput.files.length) {
            alert('Bitte eine PDF-Datei hochladen.');
            return;
          }
          if (!form.querySelector('#fZustimmung2_dynamic').checked) {
            alert("Bitte stimmen Sie der Datenschutzerklärung zu.");
            return;
          }

          // Animation starten und Formular entfernen
          contactForm.classList.add('slide-out-elliptic-left-fwd-normal');
          contactForm.addEventListener('animationend', () => {
            formContainer.innerHTML = '';
            alert('Danke für Ihre Anfrage! Wir werden uns bald bei Ihnen melden.');
          });
        });

        // Anfrage abbrechen
        cancelButton.addEventListener('click', function () {
            formContainer.innerHTML = '';
        });
      }
    });
  });
});
}

// Initialisierung
loadDynamicForms();

// FlipCards Funktionalität
function initializeFlipCards() {
  const cards = document.querySelectorAll('.card');

  // Über jedes Flip-Karten-Element iterieren, um die Flip-Funktionalität zu aktivieren
  cards.forEach(function(card) {
    const flipButtons = card.querySelectorAll('.flip-button');

    flipButtons.forEach(function(flipButton) {
      flipButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert das Überschreiben von Click-Events der Elternelemente
        card.classList.toggle('flipped'); // Die Klasse "flipped" umschalten, um die Rückseite/Vorderseite der Karte anzuzeigen
        handleGradientAnimation(card); // Gradient-Animation für die Karte auslösen
      });
    });
  });
}

// Funktion zur Steuerung der Gradienten-Animationen während des Kartenumschlags
function handleGradientAnimation(card) {
  // Wähle Gradienten-Elemente auf der Vorder- und Rückseite der Karte aus
  const gradientFrontCrown = card.querySelector('.svgFront #gradientCrown');
  const gradientFrontSilber = card.querySelector('.svgFront #silberGradient');
  const gradientFrontBlau = card.querySelector('.svgFront #blauGradient');
  const gradientFrontCopper = card.querySelector('.svgFront #copperGradient');

  const gradientBackCrown = card.querySelector('.svgBack #gradientCrown');
  const gradientBackGold = card.querySelector('.svgBack #goldGradient');
  const gradientBackSilber = card.querySelector('.svgBack #silberGradient');
  const gradientBackBlau = card.querySelector('.svgBack #blauGradient');
  const gradientBackCopper = card.querySelector('.svgBack #copperGradient');

  let startAngle = 95; // Anfangswinkel der Gradientenrotation
  let endAngle = 160; // Endwinkel der Gradientenrotation
  let currentAngle = startAngle; // Aktueller Winkel der Animation
  let direction = 1; // Animationsrichtung (1 = vorwärts, -1 = rückwärts)
  let speed = 2; // Geschwindigkeit der Winkeländerung
  let intervalSpeed = 40; // Intervallgeschwindigkeit in Millisekunden

  // Setze das Animationsintervall für die Gradientenrotation
  const interval = setInterval(function() {
    // Rotation der Vorderseiten-Gradienten
    if (gradientFrontCrown) gradientFrontCrown.setAttribute('gradientTransform', `rotate(${currentAngle})`);
    if (gradientFrontSilber) gradientFrontSilber.setAttribute('gradientTransform', `rotate(${currentAngle + 10})`);
    if (gradientFrontBlau) gradientFrontBlau.setAttribute('gradientTransform', `rotate(${currentAngle + 10})`);
    if (gradientFrontCopper) gradientFrontCopper.setAttribute('gradientTransform', `rotate(${currentAngle + 10})`);

    // Rotation der Rückseiten-Gradienten
    if (gradientBackCrown) gradientBackCrown.setAttribute('gradientTransform', `rotate(${currentAngle + 20})`);
    if (gradientBackSilber) gradientBackSilber.setAttribute('gradientTransform', `rotate(${currentAngle - 10})`);
    if (gradientBackBlau) gradientBackBlau.setAttribute('gradientTransform', `rotate(${currentAngle + 20})`);
    if (gradientBackCopper) gradientBackCopper.setAttribute('gradientTransform', `rotate(${currentAngle - 10})`);

    currentAngle += speed * direction; // Winkel anpassen

    // Drehrichtung umkehren, wenn der Endwinkel erreicht wurde
    if (currentAngle >= endAngle) {
      direction = -1;
    }

    // Stoppe die Animation, wenn der Anfangswinkel erreicht ist und die Richtung rückwärts zeigt
    if (currentAngle <= startAngle && direction === -1) {
      clearInterval(interval);
    }
  }, intervalSpeed);

  // Shine Layer Animation für die Vorderseite der Karte
  const shineLayer = card.querySelector('.shine-layer');
  if (shineLayer) {
    shineLayer.style.animation = 'shine 2s linear 1'; // Löse den Shine-Effekt während des Flips aus

    // Setze die Shine-Animation nach 3 Sekunden zurück, damit sie bei zukünftigen Flips erneut ausgeführt werden kann
    setTimeout(() => {
      shineLayer.style.animation = ''; // Animation zurücksetzen
    }, 3000);
  }
}

// Initialisierung nur bei Bedarf beim Klick auf den Button
loadDynamicForms();
