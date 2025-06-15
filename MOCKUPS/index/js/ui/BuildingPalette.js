// js/ui/BuildingPalette.js
class BuildingPalette {
    constructor(game) {
        this.game = game;
        this.listElement = document.getElementById('building-list');
    }

    update(location) {
        this.listElement.innerHTML = '';

        const buildings = BUILDING_TYPES[location];
        buildings.forEach(building => {
            const item = document.createElement('div');
            item.className = 'building-item';
            item.dataset.buildingId = building.id;
            item.innerHTML = `
                <div class="building-name">${building.name}</div>
                <div class="building-desc">${building.desc}</div>
            `;
            item.addEventListener('click', () => this.game.placementSystem.selectBuildingType(building));
            this.listElement.appendChild(item);
        });
    }
}
