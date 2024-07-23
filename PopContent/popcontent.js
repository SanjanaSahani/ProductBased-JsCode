// Function to open the modal and load HTML content
function popContent(url) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure it: GET-request for the URL provided
    xhr.open('GET', 'image-content.php', true);

    // Setting up a function to run when the request is complete
    xhr.onreadystatechange = function () {
        // Check if the request is complete (readyState 4)
        // and was successful (status 200)
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseText = xhr.responseText;
            if (responseText.trim() !== "") {
                // Display the modal with the content
                showModal(responseText);
            }
        }
    };
    // Send the request
    xhr.send();
}

// Function to display the content in a modal
function showModal(content) {
    // Create the modal element
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';

    // Create the modal content element
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = content;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Add event listener to close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal); // Remove modal from the DOM
        }
    });
}
