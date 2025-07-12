

// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fermer le menu lorsqu'un lien est cliqué
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Appliquer l'animation aux sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
})

//  script pour le formulaire
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');
    
    // Afficher un message de chargement
    formMessage.style.display = 'block';
    formMessage.className = 'form-message';
    formMessage.textContent = 'Envoi en cours...';
    
    // Utilisation de FormSubmit.co pour envoyer le formulaire
    fetch('https://formsubmit.co/ajax/rollinloictianga@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Inscription réussie ! Nous vous contacterons bientôt.';
        form.reset();
    })
    .catch(error => {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.';
        console.error('Error:', error);
    });
});