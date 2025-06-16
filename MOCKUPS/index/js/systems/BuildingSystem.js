// js/systems/BuildingSystem.js
class BuildingSystem {
    constructor(game) {
        this.game = game;
        this.placedBuildings = [];
        this.deleteMode = false;
    }

    addBuilding(building) {
        this.placedBuildings.push(building);
        this.game.uiManager.infoPanel.updateStats(this.placedBuildings);

        // Switch to Select Mode
        this.game.setMode(CONSTANTS.MODES.SELECT);

        // Select the newly added building
        this.game.selectionSystem.selectBuilding(building);

        // Update UI to reflect mode change
        this.game.uiManager.updateModeButtons(CONSTANTS.MODES.SELECT);
    }

    removeBuilding(building) {
        const index = this.placedBuildings.indexOf(building);
        if (index > -1) {
            this.placedBuildings.splice(index, 1);
            this.game.sceneManager.remove(building);
            this.game.uiManager.infoPanel.updateStats(this.placedBuildings);
        }
    }

    clearAllBuildings() {
        this.placedBuildings.forEach(building => this.game.sceneManager.remove(building));
        this.placedBuildings = [];
        this.game.uiManager.infoPanel.updateStats(this.placedBuildings);
        this.game.setMode(CONSTANTS.MODES.SELECT);
        this.game.selectionSystem.selectBuilding(building);
    }

    toggleDeleteMode() {
        // Only work in ADD mode
        if (this.game.currentMode !== CONSTANTS.MODES.ADD) return;

        this.deleteMode = !this.deleteMode;
        const btn = document.getElementById('delete-btn');

        if (this.deleteMode) {
            btn.classList.add('danger');
            this.game.placementSystem.clearGhost();
        } else {
            btn.classList.remove('danger');
        }
    }

    deleteBuilding(mouse, raycaster) {
        // Only work in ADD mode and when delete mode is active
        if (this.game.currentMode !== CONSTANTS.MODES.ADD || !this.deleteMode) return;

        raycaster.setFromCamera(mouse, this.game.cameraController.camera);
        const intersects = raycaster.intersectObjects(this.placedBuildings.map(b => b.children[0]));

        if (intersects.length > 0) {
            const building = intersects[0].object.parent;
            this.removeBuilding(building);
        }
    }
}