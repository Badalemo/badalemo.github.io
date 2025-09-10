/**
 * Encrypts the given text using the Caesar cipher technique with the specified shift.
 * Each letter in the text is shifted by a specified number of positions
 * in the alphabet, while non-alphabetic characters remain unchanged.
 * @param {number} shift - The number of positions to shift each letter in the alphabet.
 * @returns {string} - The encrypted text with the Caesar cipher applied.
 *
 * @returns {string} The encrypted text.
 *
 * @param {number} shift - The number of positions to shift each letter.





/**

/*******  f1ec5b73-27a7-4426-8ab5-b0a82ad78304  *******//*************  ✨ Windsurf Command ⭐  *************/
function caesarCipher(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char.toLowerCase());

        if (index !== -1) {
            const shiftedIndex = (index + shift) % 26;
            result += alphabet[shiftedIndex];
        } else {
            result += char;
        }
    }
    return result;
}
/**
 * Deciphers the given text using the Caesar cipher technique with the specified shift.
 * Each letter in the text is shifted by a specified number of positions
 * in the alphabet, while non-alphabetic characters remain unchanged.
 * @param {string} text - The text to be deciphered.
 * @param {number} shift - The number of positions to shift each letter.
 * @returns {string} - The decrypted text with the Caesar cipher applied.
 */
function caesarDecipher(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char.toLowerCase());

        if (index !== -1) {
            const shiftedIndex = (index - shift + 26) % 26;
            result += alphabet[shiftedIndex];
        }
        else {
            result += char;
        }
    }
    return result;
}
function rot13Cipher (text) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char.toLowerCase());

        if (index !== -1) {
            const shiftedIndex = (index + 13) % 26;
            result += alphabet[shiftedIndex];
        } else {
            result += char;
        }
    }
    return result;
}
function rot13decipher (text) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char.toLowerCase());

        if (index !== -1) {
            const shiftedIndex = (index - 13 + 26) % 26;
            result += alphabet[shiftedIndex];
        } else {
            result += char;
        }
    }
    return result;
}

const textInput = document.getElementById('textInput');
const encryptionDecryptionForm = document.getElementById('encryptionDecryptionForm');
const shiftInput = encryptionDecryptionForm.querySelector('#shift');
const shiftValue = parseInt(shiftInput.value);
let output = document.getElementById('outputText');
const encryptButton = document.getElementById('encryptButton');
let decryptButton = document.getElementById('decryptButton');
let copyButton = document.getElementById('copyButton');
const rot13Button = document.getElementById('rot13Check');
const caesarButton = document.getElementById('caesarCheck');

encryptButton.addEventListener('click', () => {
    const text = textInput.value;
    const shift = parseInt(shiftInput.value);
    const encryptedText = caesarButton.checked ? caesarCipher(text, shift) : rot13Cipher(text);
    output.textContent = encryptedText;
})
decryptButton.addEventListener('click', () => {
    let text = textInput.value;
    let shift = parseInt(shiftInput.value);
    const decryptedText = caesarButton.checked ? caesarDecipher(text, shift) : rot13decipher(text);
    output.textContent = decryptedText;
})







const passwordInput = document.getElementById('passwordInput');
const checkStrengthButton = document.getElementById('checkStrengthButton');
let strength = 0;
let strengthBar = document.getElementById('strengthBar');
const strengthOutput = document.getElementById('strengthOutput');
function checkPasswordStrength(password) {
    strength = 0;
    if (password.length < 8) {
        strength +=  0;
    }
    if (password.length >= 35) {
        strength += 4
    }
    if (password.length > 8 && password.length < 12) strength++;
    if (password.length >= 12) strength += 2;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let strengthInWords = '';
    if (strength === 0) {
        strengthInWords = 'very weak';
        strengthBar.style.width = '10%';
        strengthBar.style.backgroundColor = 'red';
    } else if (strength < 3) {
        strengthInWords = 'weak';
        strengthBar.style.width = '30%';
        strengthBar.style.backgroundColor = 'orange';
    } else if (strength < 5) {
        strengthInWords = 'medium';
        strengthBar.style.width = '60%';
        strengthBar.style.backgroundColor = 'yellow';
    } else {
        strengthInWords = 'strong';
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'green';
    }
    console.log(strengthInWords);
    return strengthInWords;
}
checkStrengthButton.addEventListener('click', () => {
    const password = passwordInput.value;
    const strengthInWords = checkPasswordStrength(password);
    strengthOutput.innerText = `${strengthInWords}`;
    strengthBar.style.display = 'block';
})
let passwordLengthInput = document.getElementById('passwordLength');
let passwordLengthValue = document.getElementById('passwordLengthValue');
let generateButton = document.getElementById('generatePasswordButton');
passwordLengthValue.innerText = passwordLengthInput.value;
passwordLengthInput.addEventListener('input', () => {
    passwordLengthValue.innerText = passwordLengthInput.value;
})
function generatePassword(length) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
generateButton.addEventListener('click', () => {
    let length = parseInt(passwordLengthInput.value);
    let password = generatePassword(length);
    let passwordOutput = document.getElementById('generatedPassword');
    passwordOutput.value = password;
})
let toastContainer = document.getElementById('toast-container');
let toastMessage = document.getElementById('toast-message'); 

function showToast(message) {
    toastMessage.textContent = message;
    toastContainer.classList.add('show');
    setTimeout(() => {
        toastContainer.classList.remove('show');
        toastContainer.classList.add('hide');
    }, 2000);
    setTimeout(() => {
        toastContainer.classList.remove('hide');
    }, 2500);
}
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent).then(() => {showToast('Text copied to clipboard!');})
})