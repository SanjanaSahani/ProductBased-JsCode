document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a unique 8-digit UFIN
    function generateUFIN() {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    }

    // Function to load the captcha
    async function loadCaptcha() {
        const ufin = generateUFIN();
        const ufinInput = document.getElementById('ufinInput');
        if (!ufinInput) {
            console.error('UFIN input element not found');
            return;
        }
        ufinInput.value = ufin;

        try {
            const response = await fetch('https://dev.gswith.com/captchac/getCaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'ACCEPT': 'application/json'
                },
                body: new URLSearchParams({ UFIN: ufin })
            });
            const data = await response.json();

            if (data) {
                const captchaElement = document.getElementById('captcha');
                if (!captchaElement) {
                    console.error('Captcha element not found');
                    return;
                }
                captchaElement.innerHTML = `<p>${data.instruction}</p>
                                            <p>${data.statement}</p>
                                            <input type="text" id="captchaInput" name="captchaInput">
                                            <button type="button" id="reloadCaptcha">Reload Captcha</button>`;

                document.getElementById('reloadCaptcha').addEventListener('click', loadCaptcha);
            }
        } catch (error) {
            console.error('Error loading captcha:', error);
        }
    }

    // Function to validate the captcha
    async function validateCaptcha(event) {
        event.preventDefault(); 
        const ufinInput = document.getElementById('ufinInput');
        const captchaInputElement = document.getElementById('captchaInput');
        if (!ufinInput || !captchaInputElement) {
            console.error('UFIN input or captcha input element not found');
            return;
        }
        const ufin = ufinInput.value;
        const captchaInput = captchaInputElement.value.toLowerCase();

        try {
            const response = await fetch('https://dev.gswith.com/captchac/checkCaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ 
                    UFIN: ufin, 
                    captcha_input: captchaInput
                 })
            });
            const result = await response.text();

            if (result === 'PASS') {
                alert('Captcha validated successfully!');
                document.getElementById('myForm').submit();
            } else {
                alert('Invalid captcha. Please try again.');
                loadCaptcha(); // Reload the captcha
            }
        } catch (error) {
            console.error('Error validating captcha:', error);
            loadCaptcha();
        }
    }

    loadCaptcha();

    // Add event listener to the submit button to validate the captcha when clicked
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    } 
    submitBtn.addEventListener('click', validateCaptcha);
        // initial load of the captcha
        loadCaptcha();

        //Checking if the form and captcha element exist
        const formElement = document.getElementById("formSignup");
        const captchaElement = document.getElementById("captcha");

        if(formElement && captchaElement){
            const submitBtn = document.getElementById("submitBtn");
            if(!submitBtn){
                console.log("Not Found");
                return;
            }
            submitBtn.addEventListener("click", validateCaptcha);
            loadCaptcha()
        } else{
            console.log("Form ot captcha not found");
        }
});

