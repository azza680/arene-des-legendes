class Arena {
    constructor() {
        this.gridSize = 7;
        this.grid = this.createGrid();
        this.render();
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < this.gridSize; y++) {
            grid[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                // 20% chance d'obstacle, 10% chance de bonus
                grid[y][x] = Math.random() < 0.2 ? 'obstacle' : 
                            Math.random() < 0.1 ? 'bonus' : 'empty';
            }
        }
        return grid;
    }

    render() {
        const arenaElement = document.getElementById('arena');
        arenaElement.innerHTML = '';

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.setProperty('--x', x);
                cell.style.setProperty('--y', y);

                if (this.grid[y][x] === 'obstacle') {
                    cell.classList.add('obstacle');
                    cell.innerHTML = '<div class="icon">✖</div>';
                } 
                else if (this.grid[y][x] === 'bonus') {
                    cell.classList.add('bonus');
                    cell.innerHTML = '<div class="icon">★</div>';
                } else {
                    cell.innerHTML = `<small>${x},${y}</small>`;
                }

                arenaElement.appendChild(cell);
            }
        }
    }
}