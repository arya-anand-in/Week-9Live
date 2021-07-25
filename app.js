const scriptURL = 'https://script.google.com/macros/s/AKfycbyUWy02Otmn4Pa5J9HuXxkZE8svCs8H5itadgkyEbj7AgmH8iinExVYlYElA9L3FeE/exec'
const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
    
    var crypt = {
        secret: "THESECRET",
        encrypt: function(password){
            var encrypted = CryptoJS.AES.encrypt(password,crypt.secret)
            encrypted = encrypted.toString()
            return encrypted
        },
        decrypt: function(encrypted){
            var decrypted = CryptoJS.AES.decrypt(encrypted,crypt.secret)
            decrypted = decrypted.toString(CryptoJS.enc.Utf8)
            return decrypted
        }
    }

    var encrypted = crypt.encrypt(document.getElementById('password').value)
    console.log(encrypted)
    document.getElementById('password').value = encrypted
    var decrypted = crypt.decrypt(encrypted)
    console.log(decrypted)

    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => document.getElementById('form_alerts').innerHTML = 'Contact message sent successfully')
    .catch(error => document.getElementById('form_alerts').innerHTML = 'Contact message has not sent')
})

