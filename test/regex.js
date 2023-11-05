let form = document.querySelector('#loginForm');

form.name.addEventListener('change', function() {
    validerName(this);
});

form.tel.addEventListener('change', function() {
    validerTel(this);
});

form.email.addEventListener('change', function() {
    validerEmail(this);
});



const validerEmail = function(inputEmail) {
    //creation du regex pour la validation email
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let testEmail = emailRegExp.test(inputEmail.value);
    let small = inputEmail.nextElementSibling;

    if(testEmail){
        small.innerHTML = 'Adresse Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    }else{
        small.innerHTML = 'Adresse non valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};



const validerName = function(inputName) {

}

const validerTel = function(inputTel) {

}