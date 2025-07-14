

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
    // Script pour gérer l'envoi du formulaire
    document.getElementById('reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formMessage = document.getElementById('form-message');
        
        // Afficher un message de chargement
        formMessage.textContent = 'Envoi en cours...';
        formMessage.style.color = '#ff8906';
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessage.textContent = 'Réservation envoyée avec succès! Nous vous contacterons bientôt.';
                formMessage.style.color = '#2cb67d';
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(error => {
            formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.';
            formMessage.style.color = '#f25f4c';
            console.error('Error:', error);
        });
    });
    document.getElementById('reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Envoyer les données à FormSubmit
        fetch('https://formsubmit.co/ajax/rollinloictianga@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                gender: document.getElementById('gender').value,
                message: document.getElementById('message').value,
                _subject: "Nouvelle réservation Game & Chill",
                _template: "table"
            })
        })
        .then(response => {
            if(response.ok) {
                // Redirection MANUELLE vers merci.html
                window.location.href = "merci.html";
            } else {
                alert("Erreur lors de l'envoi, veuillez réessayer");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });