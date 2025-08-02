document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link
    navMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });
});