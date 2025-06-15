// js/systems/SelectionSystem.js
class SelectionSystem {
    constructor(game) {
        this.game = game;
        this.selectedBuilding = null;
        this.selectionOutline = null;
        this.hoveredBuilding = null;
        this.hoverOutline = null;
        this.hoverTooltip = null;
        this.createHoverTooltip();
    }

    createHoverTooltip() {
        this.hoverTooltip = document.createElement('div');
        this.hoverTooltip.id = 'hover-tooltip';
        this.hoverTooltip.style.cssText = `
            position: absolute;
            background: rgba(27, 42, 73, 0.95);
            border: 2px solid #37b3a9;
            border-radius: 8px;
            padding: 10px;
            color: #f5f7fa;
            font-size: 14px;
            pointer-events: none;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
        document.body.appendChild(this.hoverTooltip);
    }

    updateHover(mouse, raycaster) {
        // Only work in select mode
        if (this.game.currentMode !== CONSTANTS.MODES.SELECT) {
            this.clearHover();
            return;
        }

        raycaster.setFromCamera(mouse, this.game.cameraController.camera);
        const intersects = raycaster.intersectObjects(
            this.game.buildingSystem.placedBuildings.map(b => b.children[0])
        );

        if (intersects.length > 0) {
            const building = intersects[0].object.parent;

            if (building !== this.hoveredBuilding) {
                this.clearHover();
                this.setHoveredBuilding(building);
            }

            // Update tooltip position
            const mouseX = (mouse.x + 1) * window.innerWidth / 2;
            const mouseY = (-mouse.y + 1) * window.innerHeight / 2;
            this.hoverTooltip.style.left = (mouseX + 20) + 'px';
            this.hoverTooltip.style.top = (mouseY - 20) + 'px';
        } else {
            this.clearHover();
        }
    }

    setHoveredBuilding(building) {
        this.hoveredBuilding = building;

        // Create hover outline
        const mesh = building.children[0];
        const outlineGeometry = new THREE.BoxGeometry(
            mesh.geometry.parameters.width * 1.05,
            mesh.geometry.parameters.height * 1.05,
            mesh.geometry.parameters.depth * 1.05
        );
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: CONSTANTS.COLORS.SECONDARY,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        this.hoverOutline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        this.hoverOutline.position.copy(mesh.position);
        building.add(this.hoverOutline);

        // Show tooltip with building info
        const data = building.userData;
        this.hoverTooltip.innerHTML = `
            <div style="font-weight: 600; color: #f2c94c; margin-bottom: 5px;">${data.name}</div>
            <div style="font-size: 12px; color: #7a8094; margin-bottom: 5px;">${data.desc}</div>
            <div style="font-size: 12px;">
                <span style="color: #7a8094;">Power:</span> 
                <span style="color: ${data.power > 0 ? '#e74c3c' : '#2ecc71'};">
                    ${data.power > 0 ? '+' : ''}${data.power} MW
                </span>
            </div>
            <div style="font-size: 12px;">
                <span style="color: #7a8094;">Capacity:</span> 
                <span style="color: #37b3a9;">${data.capacity} people</span>
            </div>
        `;
        this.hoverTooltip.style.display = 'block';

        // Change cursor
        document.body.style.cursor = 'pointer';
    }

    clearHover() {
        if (this.hoveredBuilding && this.hoverOutline) {
            this.hoveredBuilding.remove(this.hoverOutline);
            this.hoverOutline = null;
            this.hoveredBuilding = null;
        }
        this.hoverTooltip.style.display = 'none';
        document.body.style.cursor = 'default';
    }

    selectBuildingAtMouse(mouse, raycaster) {
        // Only work in select mode
        if (this.game.currentMode !== CONSTANTS.MODES.SELECT) return;

        raycaster.setFromCamera(mouse, this.game.cameraController.camera);
        const intersects = raycaster.intersectObjects(
            this.game.buildingSystem.placedBuildings.map(b => b.children[0])
        );

        if (intersects.length > 0) {
            const clickedBuilding = intersects[0].object.parent;
            this.selectBuilding(clickedBuilding);
        } else {
            this.deselectBuilding();
        }
    }

    selectBuilding(building) {
        // Clear hover first
        this.clearHover();

        // Deselect previous selection
        this.deselectBuilding();

        this.selectedBuilding = building;
        this.game.isItemSelected = true;

        // Create selection outline
        const mesh = building.children[0];
        const outlineGeometry = new THREE.BoxGeometry(
            mesh.geometry.parameters.width * 1.1,
            mesh.geometry.parameters.height * 1.1,
            mesh.geometry.parameters.depth * 1.1
        );
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: CONSTANTS.COLORS.HIGHLIGHT,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        this.selectionOutline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        this.selectionOutline.position.copy(mesh.position);
        building.add(this.selectionOutline);

        // Show building menu
        this.game.uiManager.buildingMenu.show(building);

        // Update mode instructions
        const instructions = document.getElementById('mode-instructions');
        instructions.innerHTML = '<strong>Building Selected:</strong> Choose an action from the menu or press ESC to deselect.';
        instructions.style.borderColor = '#f2c94c';
    }

    deselectBuilding() {
        if (this.selectedBuilding && this.selectionOutline) {
            this.selectedBuilding.remove(this.selectionOutline);
            this.selectionOutline = null;
            this.selectedBuilding = null;
        }
        this.game.isItemSelected = false;
        this.game.uiManager.buildingMenu.hide();

        // Reset mode instructions
        if (this.game.currentMode === CONSTANTS.MODES.SELECT) {
            const instructions = document.getElementById('mode-instructions');
            instructions.innerHTML = '<strong>Select Mode:</strong> Click on buildings to select them and view options. Hover to preview stats. Press 2 for Add Mode.';
            instructions.className = '';
        }
    }

    updateAnimation() {
        if (this.selectionOutline) {
            this.selectionOutline.rotation.y += 0.02;
        }
        if (this.hoverOutline) {
            this.hoverOutline.rotation.y -= 0.01;
        }
    }

    cleanup() {
        this.clearHover();
        this.deselectBuilding();
        if (this.hoverTooltip && this.hoverTooltip.parentNode) {
            this.hoverTooltip.parentNode.removeChild(this.hoverTooltip);
        }
    }
}