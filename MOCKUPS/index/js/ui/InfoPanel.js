// js/ui/InfoPanel.js
class InfoPanel {
    constructor() {
        this.locationElement = document.getElementById('current-location');
        this.buildingCountElement = document.getElementById('building-count');
        this.powerUsageElement = document.getElementById('power-usage');
        this.populationElement = document.getElementById('population');
        this.gridSizeElement = document.getElementById('grid-size');
    }

    updateLocation(location, gridSize) {
        this.locationElement.textContent =
            location.charAt(0).toUpperCase() + location.slice(1) +
            (location === 'earth' ? ' Campus' : location === 'station' ? ' Station' : ' Base');
        this.gridSizeElement.textContent = `${gridSize}x${gridSize}`;
    }

    updateStats(buildings) {
        let totalPower = 0;
        let totalPopulation = 0;

        buildings.forEach(building => {
            totalPower += building.userData.power || 0;
            totalPopulation += building.userData.capacity || 0;
        });

        this.buildingCountElement.textContent = buildings.length;
        this.powerUsageElement.textContent = `${totalPower} MW`;
        this.populationElement.textContent = totalPopulation;
    }
}