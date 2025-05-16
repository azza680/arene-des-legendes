import { Arena } from './arena.js';
import { HEROES } from './heroes.js';

function createBackgroundElements() {
    const container = document.body;

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

document.addEventListener('DOMContentLoaded', () => {
    createBackgroundElements();

    const arena = new Arena();

    const heroSelection = document.getElementById('hero-selection');
    const buttons = document.querySelectorAll('.hero-buttons button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const heroKey = button.dataset.hero;
            const hero = HEROES[heroKey];

            heroSelection.style.display = 'none';

            // ✅ 1. Vider les coins
            arena.grid[0][0] = 'empty';
            arena.grid[0][6] = 'empty';
            arena.grid[6][0] = 'empty';

            // ✅ 2. Placer le héros du joueur avec une marque spéciale
            arena.grid[0][0] = {
                type: 'hero',
                hero: {
                    ...hero,            // toutes les infos (hp, image, speed...)
                    isPlayer: true      // 🔥 nécessaire pour que le clic fonctionne
                }
            };

            // ✅ 3. Les deux autres héros (IA)
            const otherHeroes = Object.keys(HEROES).filter(k => k !== heroKey);

            arena.grid[0][6] = {
                type: 'hero',
                hero: HEROES[otherHeroes[0]]
            };

            arena.grid[6][0] = {
                type: 'hero',
                hero: HEROES[otherHeroes[1]]
            };

            // ✅ 4. Affichage
            arena.render();
        });
    });
});
