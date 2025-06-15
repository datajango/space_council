// js/core/InputManager.js
class InputManager {
    constructor(game) {
        this.game = game;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onMouseClick(e));
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('wheel', (e) => this.onMouseWheel(e));
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Camera movement
        this.game.cameraController.handleMouseMove(event);

        // Mode-specific mouse move handling
        if (this.game.currentMode === CONSTANTS.MODES.ADD) {
            this.game.placementSystem.updateGhostPosition(this.mouse);
        } else if (this.game.currentMode === CONSTANTS.MODES.SELECT) {
            this.game.selectionSystem.updateHover(this.mouse, this.raycaster);
        }
    }

    onMouseClick(event) {
        if (event.target.tagName !== 'CANVAS') return;

        // Mode-specific click handling
        if (this.game.currentMode === CONSTANTS.MODES.ADD) {
            if (this.game.buildingSystem.deleteMode) {
                this.game.buildingSystem.deleteBuilding(this.mouse, this.raycaster);
            } else if (this.game.placementSystem.ghostBuilding) {
                this.game.placementSystem.placeBuilding();
            }
        } else if (this.game.currentMode === CONSTANTS.MODES.SELECT) {
            this.game.selectionSystem.selectBuildingAtMouse(this.mouse, this.raycaster);
        }
    }

    onKeyDown(event) {
        switch (event.key.toLowerCase()) {
            case CONSTANTS.KEYS.ROTATE:
                if (this.game.currentMode === CONSTANTS.MODES.ADD) {
                    this.game.placementSystem.rotateGhostBuilding();
                }
                break;
            case CONSTANTS.KEYS.DELETE:
                if (this.game.currentMode === CONSTANTS.MODES.ADD) {
                    this.game.buildingSystem.toggleDeleteMode();
                }
                break;
            case CONSTANTS.KEYS.GRID:
                this.game.environment.toggleGrid();
                break;
            case CONSTANTS.KEYS.ESCAPE:
                if (this.game.isItemSelected) {
                    this.game.selectionSystem.deselectBuilding();
                } else if (this.game.currentMode === CONSTANTS.MODES.ADD) {
                    this.game.placementSystem.clearGhost();
                }
                break;
            case '1':
                this.game.setMode(CONSTANTS.MODES.SELECT);
                break;
            case '2':
                this.game.setMode(CONSTANTS.MODES.ADD);
                break;
        }
    }

    onMouseDown(event) {
        this.game.cameraController.handleMouseDown(event);
    }

    onMouseUp(event) {
        this.game.cameraController.handleMouseUp(event);
    }

    onMouseWheel(event) {
        this.game.cameraController.handleWheel(event);
    }

    onWindowResize() {
        this.game.sceneManager.onWindowResize(this.game.cameraController.camera);
    }
}