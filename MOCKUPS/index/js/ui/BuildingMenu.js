// js/ui/BuildingMenu.js
class BuildingMenu {
    constructor(game) {
        this.game = game;
        this.menuElement = document.getElementById('building-menu');
        this.nameElement = document.getElementById('selected-building-name');
        this.infoElement = document.getElementById('building-info');
        this.optionsElement = document.getElementById('menu-options');

        document.getElementById('close-menu-btn').addEventListener('click', () => {
            this.hide();
            this.game.selectionSystem.deselectBuilding();
        });
    }

    show(building) {
        this.nameElement.textContent = building.userData.name;

        this.infoElement.innerHTML = `
            <div class="building-info-row">
                <span class="building-info-label">Type:</span>
                <span class="building-info-value">${building.userData.name}</span>
            </div>
            <div class="building-info-row">
                <span class="building-info-label">Power:</span>
                <span class="building-info-value">${building.userData.power > 0 ? '+' : ''}${building.userData.power} MW</span>
            </div>
            <div class="building-info-row">
                <span class="building-info-label">Capacity:</span>
                <span class="building-info-value">${building.userData.capacity} people</span>
            </div>
            <div class="building-info-row">
                <span class="building-info-label">Status:</span>
                <span class="building-info-value">Operational</span>
            </div>
        `;

        const options = this.getMenuOptions(building.userData.id);
        this.optionsElement.innerHTML = '';

        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'menu-option';
            optionElement.innerHTML = `
                <div class="menu-option-title">${option.title}</div>
                <div class="menu-option-desc">${option.desc}</div>
            `;
            optionElement.addEventListener('click', () => this.handleMenuOption(building, option));
            this.optionsElement.appendChild(optionElement);
        });

        this.menuElement.style.display = 'block';
    }

    hide() {
        this.menuElement.style.display = 'none';
    }

    getMenuOptions(buildingId) {
        const baseOptions = BUILDING_MENU_OPTIONS[buildingId] || [
            { id: 'info', title: 'Building Info', desc: 'View statistics' },
            { id: 'upgrade', title: 'Upgrade', desc: 'Improve building' }
        ];

        // Always add demolish option at the end
        return [...baseOptions, { id: 'demolish', title: 'Demolish', desc: 'Remove building' }];
    }

    handleMenuOption(building, option) {
        console.log(`Selected ${option.title} for ${building.userData.name}`);

        if (option.id === 'demolish') {
            if (confirm(`Are you sure you want to demolish ${building.userData.name}?`)) {
                this.game.buildingSystem.removeBuilding(building);
                this.game.selectionSystem.deselectBuilding();
            }
        } else {
            alert(`${option.title} selected for ${building.userData.name}\n\nThis would open the ${option.desc.toLowerCase()} interface.`);
        }
    }
}