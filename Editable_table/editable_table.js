document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const cell = this.closest('td');
            const key = this.dataset.key;
            const span = cell.querySelector('.editable');
            const currentValue = span.textContent;

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('textbox');
            input.value = currentValue;
            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();

            // Handle when input loses focus
            input.addEventListener('blur', function() {
                const newValue = input.value;
                cell.innerHTML = `<span class="editable" data-key="${key}">${newValue}</span><button class="edit-btn" data-key="${key}">Edit</button>`;
                attachEditEvent(cell.querySelector('.edit-btn'));
            });

            // Handle Enter key to save the new value
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const newValue = input.value;
                    cell.innerHTML = `<span class="editable" data-key="${key}">${newValue}</span><button class="edit-btn" data-key="${key}">Edit</button>`;
                    attachEditEvent(cell.querySelector('.edit-btn'));
                }
            });
        });
    });

    function attachEditEvent(button) {
        button.addEventListener('click', function() {
            const cell = this.closest('td');
            const key = this.dataset.key;
            const span = cell.querySelector('.editable');
            const currentValue = span.textContent;

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('textbox');
            input.value = currentValue;
            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();

            // Handle when input loses focus
            input.addEventListener('blur', function() {
                const newValue = input.value;
                cell.innerHTML = `<span class="editable" data-key="${key}">${newValue}</span><button class="edit-btn" data-key="${key}">Edit</button>`;
                attachEditEvent(cell.querySelector('.edit-btn'));
            });

            // Handle Enter key to save the new value
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const newValue = input.value;
                    cell.innerHTML = `<span class="editable" data-key="${key}">${newValue}</span><button class="edit-btn" data-key="${key}">Edit</button>`;
                    attachEditEvent(cell.querySelector('.edit-btn'));
                }
            });
        });
    }
});
