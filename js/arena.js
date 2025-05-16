import { getMovableCells } from './movement.js';

export class Arena {
    constructor() {
        this.gridSize = 7;
        this.grid = this.createGrid();
        this.cellElements = [];
        this.render();
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < this.gridSize; y++) {
            grid[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                const rand = Math.random();
                const isCorner =
                    (x === 0 && y === 0) ||
                    (x === 6 && y === 0) ||
                    (x === 0 && y === 6);

                grid[y][x] = isCorner
                    ? 'empty'
                    : rand < 0.2 ? 'obstacle' :
                      rand < 0.3 ? 'bonus' : 'empty';
            }
        }
        return grid;
    }

    render() {
        const arenaElement = document.getElementById('arena');
        arenaElement.innerHTML = '';
        this.cellElements = [];

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.setProperty('--x', x);
                cell.style.setProperty('--y', y);

                const cellData = this.grid[y][x];

                if (cellData === 'obstacle') {
                    cell.classList.add('obstacle');
                    cell.innerHTML = '<div class="icon">⛔</div>';
                } else if (cellData === 'bonus') {
                    cell.classList.add('bonus');
                    const img = document.createElement('img');
                    img.src = 'assets/images/bonus.gif';
                    img.alt = 'Bonus';
                    img.classList.add('bonus-img');
                    cell.appendChild(img);
                } else if (typeof cellData === 'object' && cellData.type === 'hero') {
                    const hero = cellData.hero;
                    cell.classList.add('hero');
                    const img = document.createElement('img');
                    img.src = hero.image;
                    img.alt = hero.name;
                    img.classList.add('hero-img');
                    cell.appendChild(img);

                    if (hero.isPlayer) {
                        cell.style.cursor = 'pointer';
                        cell.addEventListener('click', () => {
                            console.log("✅ Héros cliqué !");
                            this.highlightMovableCells(hero, x, y);
                        });
                    }
                } else {
                    // ✅ Corrigé ici
                    cell.innerHTML = `<small>${x},${y}</small>`;
                }

                this.cellElements.push(cell);
                arenaElement.appendChild(cell);
            }
        }
    }

    highlightMovableCells(hero, currentX, currentY) {
        const reachable = getMovableCells(this.grid, hero, currentX, currentY);

        if (reachable.length === 0) {
            console.warn("🚫 Aucune case accessible pour le héros !");
            return;
        }

        console.log("📍 Cases accessibles :", reachable);

        reachable.forEach(({ x, y }) => {
            const index = y * this.gridSize + x;
            const cell = this.cellElements[index];
            cell.classList.add('movable');

            cell.addEventListener('click', () => {
                this.moveHero(currentX, currentY, x, y);
            }, { once: true });
        });
    }

    clearMovableHighlights() {
        this.cellElements.forEach(cell => {
            cell.classList.remove('movable');
            const clone = cell.cloneNode(true);
            cell.replaceWith(clone);
        });
    }

    moveHero(fromX, fromY, toX, toY) {
        const heroData = this.grid[fromY][fromX];
        const isBonus = this.grid[toY][toX] === 'bonus';

        this.grid[toY][toX] = heroData;
        this.grid[fromY][fromX] = 'empty';

        if (isBonus) {
            console.log("🎁 Bonus ramassé !");
        }

        this.clearMovableHighlights();
        this.render();
    }

    findFirstEmptyCell() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x] === 'empty') {
                    return { x, y };
                }
            }
        }
        return null;
    }
}
