document.addEventListener('DOMContentLoaded', function () {
    // === Statisches Kontaktformular ===
    const staticForm = document.getElementById('staticContactForm');
    const toastMessage = document.getElementById('toastMessage');

    if (staticForm) {
        staticForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(staticForm);
            formData.append('action', 'send_static_form');

            fetch('<?php echo esc_url(admin_url('admin-post.php')); ?>', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.data.message, 'success');
                    staticForm.reset();
                } else {
                    showToast(data.data.message, 'error');
                }
            })
            .catch(() => showToast('Ein unerwarteter Fehler ist aufgetreten.', 'error'));
        });
    }

    // === Dynamisches Formular ===
    const dynamicForms = document.querySelectorAll('.contact-form2');

    dynamicForms.forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append('action', 'send_dynamic_form');

            fetch('<?php echo esc_url(admin_url('admin-post.php')); ?>', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.data.message, 'success');
                    form.reset();
                } else {
                    showToast(data.data.message, 'error');
                }
            })
            .catch(() => showToast('Ein unerwarteter Fehler ist aufgetreten.', 'error'));
        });
    });

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
});
