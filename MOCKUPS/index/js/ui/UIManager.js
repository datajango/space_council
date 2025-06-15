// js/ui/UIManager.js
class UIManager {
    constructor(game) {
        this.game = game;
        this.buildingMenu = new BuildingMenu(game);
        this.buildingPalette = new BuildingPalette(game);
        this.infoPanel = new InfoPanel();

        this.setupControlButtons();
        this.setupLocationButtons();
        this.setupModeButtons();
    }

    setupModeButtons() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.game.setMode(mode);
            });
        });
    }

    setupControlButtons() {
        document.getElementById('rotate-btn').addEventListener('click', () => {
            if (this.game.currentMode === CONSTANTS.MODES.ADD) {
                this.game.placementSystem.rotateGhostBuilding();
            }
        });

        document.getElementById('delete-btn').addEventListener('click', () => {
            if (this.game.currentMode === CONSTANTS.MODES.ADD) {
                this.game.buildingSystem.toggleDeleteMode();
            }
        });

        document.getElementById('grid-toggle').addEventListener('click', () => {
            this.game.environment.toggleGrid();
        });

        document.getElementById('reset-camera').addEventListener('click', () => {
            this.game.cameraController.reset(ENVIRONMENTS[this.game.currentLocation]);
        });
    }

    setupLocationButtons() {
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const location = e.target.dataset.location;
                this.game.switchLocation(location);
            });
        });
    }

    updateLocationButtons(currentLocation) {
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.location === currentLocation);
        });
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
}