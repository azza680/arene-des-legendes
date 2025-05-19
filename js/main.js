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

function lancerDe(sides = 6) {
    return Math.floor(Math.random() * sides) + 1;
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

            // Vider les coins
            arena.grid[0][0] = 'empty';
            arena.grid[0][6] = 'empty';
            arena.grid[6][0] = 'empty';

            // Placer le héros du joueur
            arena.grid[0][0] = {
                type: 'hero',
                hero: {
                    ...hero,
                    isPlayer: true
                }
            };

            const otherHeroes = Object.keys(HEROES).filter(k => k !== heroKey);

            // IA 1
            arena.grid[0][6] = {
                type: 'hero',
                hero: {
                    ...HEROES[otherHeroes[0]]
                }
            };

            // IA 2
            arena.grid[6][0] = {
                type: 'hero',
                hero: {
                    ...HEROES[otherHeroes[1]]
                }
            };

            // 🎲 SYSTÈME DE DÉ POUR L’ORDRE DE TOUR
            const herosAvecScores = [
                { position: [0, 0], hero: arena.grid[0][0].hero },
                { position: [0, 6], hero: arena.grid[0][6].hero },
                { position: [6, 0], hero: arena.grid[6][0].hero }
            ];

            herosAvecScores.forEach(h => {
                h.roll = lancerDe();
            });

            herosAvecScores.sort((a, b) => b.roll - a.roll);

            arena.turnOrder = herosAvecScores;
            arena.currentTurn = 0;

            // Affichage de l'ordre de tour
            let turnDiv = document.getElementById('turn-info');
            if (!turnDiv) {
                turnDiv = document.createElement('div');
                turnDiv.id = 'turn-info';
                turnDiv.classList.add('turn-banner');
                document.body.insertBefore(turnDiv, document.body.firstChild);
            }

            const joueur = herosAvecScores[0].hero;
            turnDiv.textContent = `🎲 ${joueur.name} commence ! (dé = ${herosAvecScores[0].roll})`;

            // Affichage
            arena.render();
        });
    });
});
