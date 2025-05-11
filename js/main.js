// Création des éléments de fond
function createBackgroundElements() {
    const container = document.body;
    
    // Étoiles
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.7;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 15 + 5}s`;
        container.appendChild(star);
    }
    
    // Particules
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animationDuration = `${Math.random() * 30 + 20}s`;
        container.appendChild(particle);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundElements();
    new Arena();
});