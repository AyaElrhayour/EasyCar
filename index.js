const displayButtons = document.querySelectorAll('.display-btn');

displayButtons.forEach(button => {
    console.log("clicked");
    button.addEventListener('click', () => {
        button.parentElement.childNodes[3].classList.toggle('hidden');
    });
});