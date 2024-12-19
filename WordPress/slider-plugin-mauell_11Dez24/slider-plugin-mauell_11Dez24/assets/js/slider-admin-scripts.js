jQuery(document).ready(function ($) {
    const container = $('#custom-slider-slides-container');
    const addButton = $('#add-slider-slide');

    // Slide hinzufügen
    addButton.on('click', function () {
        const slideCount = container.find('.custom-slider-slide').length;
        const newSlide = `
            <div class="custom-slider-slide">
                <h4>Slide ${slideCount + 1}</h4>
                <label>Hintergrundbild:</label>
                <input type="text" name="custom_slider_slides[${slideCount}][background]" style="width: 100%;" placeholder="Hintergrundbild-URL" />
                <label>Kleines Bild:</label>
                <input type="text" name="custom_slider_slides[${slideCount}][foreground]" style="width: 100%;" placeholder="Kleines Bild-URL" />
                <label>Text (Überschrift):</label>
                <input type="text" name="custom_slider_slides[${slideCount}][title]" style="width: 100%;" placeholder="Überschrift" />
                <label>Text (Beschreibung):</label>
                <textarea name="custom_slider_slides[${slideCount}][description]" style="width: 100%;" rows="3" placeholder="Beschreibung"></textarea>
                <label>Button-Beschriftung:</label>
                <input type="text" name="custom_slider_slides[${slideCount}][button_text]" style="width: 100%;" placeholder="Button-Beschriftung" />
                <label>Button-Link:</label>
                <input type="text" name="custom_slider_slides[${slideCount}][button_link]" style="width: 100%;" placeholder="Button-Link (optional)" />
                <button type="button" class="button remove-slider-slide">Entfernen</button>
            </div>`;
        container.append(newSlide);
    });

    // Slide entfernen
    container.on('click', '.remove-slider-slide', function () {
        $(this).closest('.custom-slider-slide').remove();
    });
});
