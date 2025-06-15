// js/systems/PlacementSystem.js
class PlacementSystem {
    constructor(game) {
        this.game = game;
        this.ghostBuilding = null;
        this.selectedBuildingType = null;
    }

    selectBuildingType(buildingType) {
        console.log('SelectBuildingType called:', buildingType);

        // Clear any existing ghost first
        this.clearGhost();

        // Now set the new building type
        this.selectedBuildingType = buildingType;
        this.game.buildingSystem.deleteMode = false;
        document.getElementById('delete-btn').classList.remove('danger');

        // Create ghost building
        this.ghostBuilding = Building.createMesh(buildingType, true);
        this.game.sceneManager.add(this.ghostBuilding);

        console.log('Building type selected:', {
            type: this.selectedBuildingType,
            ghostCreated: !!this.ghostBuilding
        });
    }

    clearGhost() {
        if (this.ghostBuilding) {
            this.game.sceneManager.remove(this.ghostBuilding);
            this.ghostBuilding = null;
        }
        this.selectedBuildingType = null;
    }

    updateGhostPosition(mouse) {
        // Add mode check
        if (!this.ghostBuilding || this.game.buildingSystem.deleteMode || this.game.currentMode !== CONSTANTS.MODES.ADD) return;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.game.cameraController.camera);
        const intersects = raycaster.intersectObject(this.game.environment.ground);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            const env = ENVIRONMENTS[this.game.currentLocation];
            const gridSize = env.gridSize / env.gridDivisions;

            // Snap to grid
            const snappedX = Math.round(point.x / gridSize) * gridSize;
            const snappedZ = Math.round(point.z / gridSize) * gridSize;

            this.ghostBuilding.position.x = snappedX;
            this.ghostBuilding.position.z = snappedZ;

            // Check for collisions
            const hasCollision = this.checkCollision(this.ghostBuilding);
            const mesh = this.ghostBuilding.children[0];
            mesh.material.color.setHex(hasCollision ? CONSTANTS.COLORS.DANGER : CONSTANTS.COLORS.SECONDARY);
            mesh.material.emissive.setHex(hasCollision ? CONSTANTS.COLORS.DANGER : CONSTANTS.COLORS.SECONDARY);
        }
    }

    checkCollision(building) {
        const box1 = new THREE.Box3().setFromObject(building);

        for (let placedBuilding of this.game.buildingSystem.placedBuildings) {
            const box2 = new THREE.Box3().setFromObject(placedBuilding);
            if (box1.intersectsBox(box2)) {
                return true;
            }
        }

        // Also check if building is within grid bounds
        const env = ENVIRONMENTS[this.game.currentLocation];
        const halfGrid = env.gridSize / 2;
        const pos = building.position;

        if (Math.abs(pos.x) > halfGrid || Math.abs(pos.z) > halfGrid) {
            return true; // Out of bounds
        }

        return false;
    }

    placeBuilding() {
        console.log('PlaceBuilding called:', {
            ghostBuilding: !!this.ghostBuilding,
            selectedBuildingType: this.selectedBuildingType
        });

        if (!this.ghostBuilding || !this.selectedBuildingType) {
            console.log('PlaceBuilding guard triggered - exiting');
            return;
        }

        const hasCollision = this.checkCollision(this.ghostBuilding);
        console.log('Collision check:', hasCollision);

        if (!hasCollision) {
            const building = Building.createMesh(this.selectedBuildingType);
            building.position.copy(this.ghostBuilding.position);
            building.rotation.copy(this.ghostBuilding.rotation);

            this.game.sceneManager.add(building);
            this.game.buildingSystem.addBuilding(building);

            // Clear trees in the building area (Earth only)
            if (this.game.currentLocation === 'earth') {
                this.game.environment.clearTreesInArea(building);
            }

            console.log('Building placed successfully');

            // Keep ghost for continuous placement
            this.updateGhostPosition(this.game.inputManager.mouse);
        }
    }

    rotateGhostBuilding() {
        if (this.ghostBuilding) {
            this.ghostBuilding.rotation.y += Math.PI / 2;
        }
    }
}