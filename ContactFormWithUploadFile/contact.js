function toggleCancelButton() {
    const attachment = document.getElementById('attachment');
    const cancelButton = document.getElementById('cancelButton');
    
    if (attachment.value) {
        cancelButton.style.display = 'inline-block';
    } else {
        cancelButton.style.display = 'none';
    }
}

function cancelAttachment() {
    const attachment = document.getElementById('attachment');
    const attachmentError = document.getElementById('attachmentError');
    
    attachment.value = "";
    attachmentError.innerText = "";
    document.getElementById('cancelButton').style.display = 'none';
    
    // Reset the file input to trigger the onchange event
    attachment.dispatchEvent(new Event('change'));
}

function validateForm() {
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name').value;
    if (name.length < 3 || name.length > 18) {
        isValid = false;
        document.getElementById('nameError').innerText = 'Name must be between 3 and 18 characters.';
    } else {
        document.getElementById('nameError').innerText = '';
    }

    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[\w\.\-]+@[a-zA-Z\d\-]+\.[a-zA-Z]{2,6}$/;
    if (email.length < 5 || email.length > 25 || !emailPattern.test(email)) {
        isValid = false;
        document.getElementById('emailError').innerText = 'Enter a valid email address (5-25 characters).';
    } else {
        document.getElementById('emailError').innerText = '';
    }

    // Validate Description
    const description = document.getElementById('description').value;
    if (description.length > 250) {
        isValid = false;
        document.getElementById('descriptionError').innerText = 'Description cannot exceed 250 characters.';
    } else {
        document.getElementById('descriptionError').innerText = '';
    }

    // Validate Attachment
    const attachment = document.getElementById('attachment').files[0];
    if (attachment) {
        const maxSize = 2 * 1024 * 1024; // 2MB
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
        if (attachment.size > maxSize) {
            isValid = false;
            document.getElementById('attachmentError').innerText = 'File size must be less than 2MB.';
        } else if (!allowedTypes.includes(attachment.type)) {
            isValid = false;
            document.getElementById('attachmentError').innerText = 'Only PDF and image files are allowed.';
        } else {
            document.getElementById('attachmentError').innerText = '';
        }
    }

    // Set hidden input to detect spam/robotic action
    document.getElementById('hiddenInput').value = '';

    return isValid;
}
