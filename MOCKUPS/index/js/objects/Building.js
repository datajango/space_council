// js/objects/Building.js
class Building {
    static createMesh(buildingType, isGhost = false) {
        const group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(
            buildingType.size * 0.9,
            buildingType.size * 0.5 + Math.random() * 2,
            buildingType.size * 0.9
        );

        const material = new THREE.MeshPhongMaterial({
            color: isGhost ? CONSTANTS.COLORS.SECONDARY : Building.getColor(buildingType.id),
            transparent: isGhost,
            opacity: isGhost ? 0.5 : 1,
            emissive: isGhost ? CONSTANTS.COLORS.SECONDARY : 0x000000,
            emissiveIntensity: isGhost ? 0.3 : 0
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.y = mesh.geometry.parameters.height / 2;
        group.add(mesh);

        if (!isGhost) {
            const label = Building.createLabel(buildingType.name);
            label.position.y = mesh.geometry.parameters.height + 1.5;
            group.add(label);
        }

        group.userData = { ...buildingType, isGhost, mesh: mesh };

        return group;
    }

    static createLabel(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = 'rgba(27, 42, 73, 0.9)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#37B3A9';
        context.lineWidth = 2;
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        context.fillStyle = '#F5F7FA';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(4, 1, 1);

        return sprite;
    }

    static getColor(buildingId) {
        const colors = {
            admin: CONSTANTS.COLORS.PRIMARY,
            launch: CONSTANTS.COLORS.DANGER,
            research: 0x3498DB,
            habitat: CONSTANTS.COLORS.SUCCESS,
            power: CONSTANTS.COLORS.WARNING,
            comms: 0x9B59B6,
            hangar: 0x34495E,
            storage: 0x7F8C8D,
            greenhouse: 0x27AE60,
            solar: 0xF1C40F,
            training: 0xE67E22,
            medical: CONSTANTS.COLORS.DANGER,
            engineering: 0x95A5A6,
            observatory: 0x8E44AD,
            command: 0x2C3E50,
            docking: 0x16A085,
            colony: 0xD35400,
            mining_rig: 0x7F8C8D,
            refinery: 0xC0392B
        };
        return colors[buildingId] || 0x34495E;
    }
}