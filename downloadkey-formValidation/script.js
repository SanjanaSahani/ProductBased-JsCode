function validateForm() {
    const nameInput = document.getElementById('name');
    const keyInput = document.getElementById('key');
    const submitButton = document.getElementById('submit-btn');
    const nameError = document.getElementById('name-error');
    const keyError = document.getElementById('key-error');

    const name = nameInput.value.trim();
    const key = keyInput.value.trim();

    if (name.length < 4) {
        nameError.textContent = 'Name must be at least 4 characters long';
    } else {
        nameError.textContent = '';
    }

    if (key.length < 4) {
        keyError.textContent = 'Key must be at least 4 characters long';
    } else {
        keyError.textContent = '';
    }
    submitButton.disabled = name.length < 4 || key.length < 4;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('name').addEventListener('input', validateForm);
    document.getElementById('key').addEventListener('input', validateForm);
    validateForm();
});
