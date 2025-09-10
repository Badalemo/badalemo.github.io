let articleSelector = document.getElementById('articleSelector');
//let phishingAttacks = articleSelector.querySelector('option[value="phishing"]');
let articleText = document.getElementById('articleText');

articleSelector.addEventListener('change', function() {
    console.log('articleSelector value:', articleSelector.value);
    let selectedOption = articleSelector.value;
    if (selectedOption === 'phishing') {
        articleText.innerHTML = `<a href="https://www.ncsc.gov.uk/guidance/phishing" target="_blank">
           <img src="phishing.png" alt="Phishing Infographic"
           style="width: 95%; height: 95%"> 
        </a>`
    }
    else if (selectedOption === "passwords") {
        articleText.innerHTML = `<a href="https://www.cisa.gov/secure-our-world/use-strong-passwords" target="_blank">
           <img src="password.png" alt="Password Infographic"
           style="width: 95%; height: 95%"> 
        </a>`
    }
    else if (selectedOption === "social-engineering") {
        articleText.innerHTML = `<a href="https://www.forbes.com/sites/technology/article/what-is-social-engineering/" target="_blank">
           <img src="socialeng.png" alt="Social Engineering Infographic"
           style="width: 95%; height: 95%"> 
        </a>`
    }
    else if (selectedOption === "data-privacy") {
        articleText.innerHTML = `<a href="https://www.ibm.com/think/topics/data-privacy" target="_blank">
           <img src="dataprivacy.png" alt="Data Privacy Infographic"
           style="width: 95%; height: 95%"> 
        </a>`
    }
    else {
        articleText.innerHTML = "Please select an article to read.";
    }
})
let startQuizButton = $('#startQuizButton');
startQuizButton.click(function () {
    $('#formContainer').css('display', 'block');
    $('#quizText').css('display', 'none');
    $('#startQuizButton').css('display', 'none');
})

let score = 0
let radioButtonsSet1 = $('.answer1')
let radioButtonSet2 = $('.answer2')
let radioButtonSet3 = $('.answer3')
let radioButtonSet4 = $('.answer4')
let radioButtonSet5 = $('.answer5')
let radioButtonset6 = $('.answer6') 
let radioButtonset7 = $('.answer7')
radioButtonsSet1.on('change', (event) => {
    let selectedValue = $('input[name="mfa"]:checked').val();
    if (selectedValue === 'extraLayer') {
        $('#answer1').html('Correct! MFA adds an extra layer of security beyond just a password.');
        document.getElementById('answer1').style.color = 'green';
        document.getElementById('question1').disabled = true;
        score++;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }
    else {
        $('#answer1').html('Incorrect! MFA adds an extra layer of security beyond just a password.');
        document.getElementById('answer1').style.color = 'red';
        document.getElementById('question1').disabled = true;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }

})
radioButtonSet2.on('change', (event) => {
    let selectedValue = $('input[name="password"]:checked').val();
    if (selectedValue === 'answer3') {
        $('#answer2').html('Correct! A strong password combines uppercase and lowercase letters, numbers, and symbols, and is sufficiently long. Avoid common phrases or easily guessable patterns.');
        document.getElementById('answer2').style.color = 'green';
        document.getElementById('question2').disabled = true;
        score++;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }
    else {
        $('#answer2').html('Incorrect! A strong password combines uppercase and lowercase letters, numbers, and symbols, and is sufficiently long. Avoid common phrases or easily guessable patterns.');
        document.getElementById('answer2').style.color = 'red';
        document.getElementById('question2').disabled = true;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }
})
radioButtonSet3.on('change', (event) => {
    let selectedValue = $('input[name="email"]:checked').val();
    if (selectedValue === 'answer4') {
        $('#answer3').html('Correct! This is a classic phishing attempt. Never click suspicious links in emails. Always go directly to the legitimate website by typing its URL into your browser or using a trusted bookmark.');
        document.getElementById('answer3').style.color = 'green';
        document.getElementById('question3').disabled = true;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
        console.log("score: " + score);
    }
    else {
        $('#answer3').html('Incorrect! This is a classic phishing attempt. Never click suspicious links in emails. Always go directly to the legitimate website by typing its URL into your browser or using a trusted bookmark.');
        document.getElementById('answer3').style.color = 'red';
        document.getElementById('question3').disabled = true;
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
        console.log("score: " + score);
    }
})
radioButtonSet4.on('change', (event) => {
    let selectedValue= $('input[name="malware"]:checked').val();
    if (selectedValue === 'answer2') {
        $('#answer4').html('Correct! Malware is a broad term for "malicious software," including viruses, worms, Trojans, ransomware, and spyware, all designed to harm or exploit computer systems. ');
        document.getElementById('answer4').style.color = 'green';
        document.getElementById('question4').disabled = true;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
        console.log("score: " + score);
    }
    else {
        $('#answer4').html('Incorrect! Malware is a broad term for "malicious software," including viruses, worms, Trojans, ransomware, and spyware, all designed to harm or exploit computer systems. ');
        document.getElementById('answer4').style.color = 'red';
        document.getElementById('question4').disabled = true;
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
        console.log("score: " + score);
    }
})
radioButtonSet5.on('change', (event) => {
    let selectedValue= $('input[name="wifi"]:checked').val();
    if (selectedValue === 'answer3') {
        $('#answer5').html('Correct! Logging into your online banking account is not safe to do over a public Wi-Fi network without a VPN.');
        document.getElementById('answer5').style.color = 'green';
        document.getElementById('question5').disabled = true;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score+" out of 7"
        console.log("score: " + score);
    }
    else {
        $('#answer5').html('Incorrect! Logging into your online banking account is not safe to do over a public Wi-Fi network without a VPN.');
        document.getElementById('answer5').style.color = 'red';
        document.getElementById('question5').disabled = true;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }
})
radioButtonset6.on('change', (event) => {
    let selectedValue= $('input[name="backup"]:checked').val();
    if (selectedValue === 'answer3') {
        $('#answer6').html('Correct! The 3-2-1 backup rule provides robust data protection: 3 copies (original + 2 backups), on 2 types of storage (e.g., internal drive and external drive), with 1 copy stored physically off-site (e.g., cloud backup or a drive at a different location).');
        document.getElementById('answer6').style.color = 'green';
        document.getElementById('question6').disabled = true;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
        console.log("score: " + score);
    }
    else {
        $('#answer6').html('Incorrect! The 3-2-1 backup rule provides robust data protection: 3 copies (original + 2 backups), on 2 types of storage (e.g., internal drive and external drive), with 1 copy stored physically off-site (e.g., cloud backup or a drive at a different location).');
        document.getElementById('answer6').style.color = 'red';
        document.getElementById('question6').disabled = true;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score + " out of 7"
    }
})
radioButtonset7.on('change', (event) => {
    let selectedValue= $('input[name="phishing"]:checked').val();
    if (selectedValue === 'answer2') {
        $('#answer7').html('Correct! Phishing is a social engineering technique where attackers try to "fish" for sensitive information (like usernames, passwords, credit card details) by impersonating a trustworthy entity through deceptive emails, messages, or websites.');
        document.getElementById('answer7').style.color = 'green';
        document.getElementById('question7').disabled = true;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score +" out of 7"
        console.log("score: " + score);
    }
    else {
        $('#answer7').html('Incorrect! Phishing is social engineering technique where attackers try to "fish" for sensitive information (like usernames, passwords, credit card details) by impersonating a trustworthy entity through deceptive emails, messages, or websites.');
        document.getElementById('answer7').style.color = 'red';
        document.getElementById('question7').disabled = true;
        console.log("score: " + score);
        document.getElementById('score').innerHTML = "Score: " + score +" out of 7"
    }
})
let customerSupport = document.getElementById('customerSupport');
let phishingFeedback = document.getElementById('phishingFeedback');
let phishingFeedbackJquery = $('#phishingFeedback');
function sendFeedback(message) {
    phishingFeedback.innerHTML = message;
}
function showFeedback() {
    phishingFeedbackJquery.stop(true, true);
    phishingFeedbackJquery.css('display', 'block').animate({
        height: '30%',
        opacity: 1
    }, 400);
}
customerSupport.addEventListener('click', () => {
    sendFeedback("Always check the sender's actual email address, not just the display name. Legitimate organizations rarely use generic or misspelled domains. This domain (.co.ru) is suspicious for a bank!")
    showFeedback();
});
let phishingSubject = document.getElementById('phishingSubject');
phishingSubject.addEventListener('click', () => {
    sendFeedback("Be wary of subject lines that demand immediate action, create panic, or use threatening language. Legitimate organizations rarely pressure you to act so quickly.")
    showFeedback();
})
let verifyButton = document.getElementById('verifyButton');
verifyButton.addEventListener('click', () => {
    sendFeedback("Never click links in suspicious emails. Instead, manually type the official website address into your browser or use a trusted bookmark to log in and check your account.")
    showFeedback();
})
let yourBank = document.getElementById('yourBank');
yourBank.addEventListener('click', () => {
    sendFeedback("Legitimate communications from your bank or other services typically address you by name and use a more specific closing. Generic greetings and sign-offs are common in phishing attempts.")
    showFeedback();
})




