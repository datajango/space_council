// js/Game.js
class Game {
    constructor() {
        this.currentLocation = 'earth';
        this.currentMode = CONSTANTS.MODES.ADD; // Default to add mode
        this.isItemSelected = false; // Track if an item is selected

        // Core systems
        this.sceneManager = new SceneManager();
        this.cameraController = new CameraController();
        this.environment = new Environment(this.sceneManager);

        // Game systems
        this.buildingSystem = new BuildingSystem(this);
        this.selectionSystem = new SelectionSystem(this);
        this.placementSystem = new PlacementSystem(this);

        // UI
        this.uiManager = new UIManager(this);

        // Input
        this.inputManager = new InputManager(this);

        this.init();
    }

    init() {
        try {
            // Initialize environment
            this.environment.create(this.currentLocation);
            this.environment.addTrees(this.currentLocation);

            // Update UI
            this.uiManager.buildingPalette.update(this.currentLocation);
            this.uiManager.infoPanel.updateLocation(this.currentLocation, ENVIRONMENTS[this.currentLocation].gridSize);

            // Set initial mode
            this.setMode(CONSTANTS.MODES.ADD);

            // Hide loading screen
            this.uiManager.hideLoading();

            // Start animation loop
            this.animate();
        } catch (error) {
            console.error('Failed to initialize game:', error);
            alert('Failed to initialize game. Please refresh the page.');
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate space station slowly
        if (this.currentLocation === 'station' && this.environment.ground) {
            this.environment.ground.rotation.z += 0.001;
        }

        // Animate selection outline
        this.selectionSystem.updateAnimation();

        // Render
        this.sceneManager.render(this.cameraController.camera);
    }

    setMode(mode) {
        this.currentMode = mode;
        console.log('Mode changed to:', mode);

        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Update instructions
        const instructions = document.getElementById('mode-instructions');
        if (mode === CONSTANTS.MODES.ADD) {
            instructions.innerHTML = '<strong>Add Mode:</strong> Select a building from the palette and click to place it. Press R to rotate, D for delete mode. Press 1 for Select Mode.';
            instructions.className = 'add-mode';
            document.getElementById('building-palette').classList.add('show');

            // Clear any selection
            this.selectionSystem.deselectBuilding();
        } else if (mode === CONSTANTS.MODES.SELECT) {
            instructions.innerHTML = '<strong>Select Mode:</strong> Click on buildings to select them and view options. Hover to preview stats. Press 2 for Add Mode.';
            instructions.className = '';
            document.getElementById('building-palette').classList.remove('show');

            // Clear placement ghost
            this.placementSystem.clearGhost();
            this.buildingSystem.deleteMode = false;
            document.getElementById('delete-btn').classList.remove('danger');
        }
    }

    switchLocation(location) {
        this.currentLocation = location;

        // Update UI
        this.uiManager.updateLocationButtons(location);

        // Clear everything
        this.buildingSystem.clearAllBuildings();
        this.environment.clearTrees();
        this.placementSystem.clearGhost();
        this.selectionSystem.deselectBuilding();
        this.buildingSystem.deleteMode = false;

        // Create new environment
        this.environment.create(location);
        this.environment.addTrees(location);

        // Update systems
        this.uiManager.buildingPalette.update(location);
        this.uiManager.infoPanel.updateLocation(location, ENVIRONMENTS[location].gridSize);

        // Reset camera
        this.cameraController.reset(ENVIRONMENTS[location]);
    }
}