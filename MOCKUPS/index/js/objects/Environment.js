// js/objects/Environment.js
class Environment {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.ground = null;
        this.gridHelper = null;
        this.trees = [];
        this.showGrid = true;
    }

    create(location) {
        const env = ENVIRONMENTS[location];

        // Clear existing environment
        if (this.ground) this.sceneManager.remove(this.ground);
        if (this.gridHelper) this.sceneManager.remove(this.gridHelper);

        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(env.gridSize * 2, env.gridSize * 2);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: env.groundColor,
            depthWrite: true
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.receiveShadow = true;
        this.sceneManager.add(this.ground);

        // Create grid
        this.gridHelper = new THREE.GridHelper(
            env.gridSize,
            env.gridDivisions,
            CONSTANTS.COLORS.SECONDARY,
            CONSTANTS.COLORS.PRIMARY
        );
        this.gridHelper.visible = this.showGrid;
        this.sceneManager.add(this.gridHelper);

        // Set sky color
        if (location === 'station' || location === 'moon' || location === 'asteroid') {
            this.createStarfield();
            this.sceneManager.setClearColor(0x000000);
        } else if (location === 'earth') {
            this.sceneManager.setClearColor(env.skyColor);
        } else if (location === 'mars') {
            this.sceneManager.setClearColor(env.skyColor);
        }
    }

    createStarfield() {
        // Remove existing stars
        const existingStars = this.sceneManager.scene.children.filter(child =>
            child instanceof THREE.Points && child.material.color.getHex() === 0xffffff
        );
        existingStars.forEach(stars => this.sceneManager.remove(stars));

        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            sizeAttenuation: false
        });

        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.sceneManager.add(stars);
    }

    addTrees(location) {
        if (location !== 'earth') return;

        const env = ENVIRONMENTS.earth;
        const gridSize = env.gridSize / env.gridDivisions;

        // Create different density zones for more natural distribution
        const zones = [
            { density: 0.9, radius: env.gridSize * 0.35, count: 100 }, // Dense forest area - INCREASED RADIUS & COUNT
            { density: 0.7, radius: env.gridSize * 0.45, count: 80 }, // Medium density
            { density: 0.5, radius: env.gridSize * 0.5, count: 10 }  // Sparse outer area
        ];

        zones.forEach(zone => {
            for (let i = 0; i < zone.count; i++) {
                // Generate position within zone
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * zone.radius;
                const x = Math.cos(angle) * distance;
                const z = Math.sin(angle) * distance;

                // Add some clustering - trees tend to grow near each other
                const clusterSize = Math.random() < 0.5 ? Math.floor(Math.random() * 5) + 1 : 0;

                for (let j = 0; j <= clusterSize; j++) {
                    const clusterX = x + (Math.random() - 0.5) * gridSize * 1.5;
                    const clusterZ = z + (Math.random() - 0.5) * gridSize * 1.5;

                    // Keep within bounds
                    if (Math.abs(clusterX) > env.gridSize * 0.45 ||
                        Math.abs(clusterZ) > env.gridSize * 0.45) continue;

                    // Snap to grid with offset
                    const snappedX = Math.round(clusterX / gridSize) * gridSize;
                    const snappedZ = Math.round(clusterZ / gridSize) * gridSize;

                    const offsetX = (Math.random() - 0.5) * gridSize * 0.3;
                    const offsetZ = (Math.random() - 0.5) * gridSize * 0.3;

                    // Check if position is too close to existing trees (prevent overlap)
                    const finalX = snappedX + offsetX;
                    const finalZ = snappedZ + offsetZ;

                    let tooClose = false;
                    for (let tree of this.trees) {
                        const dx = tree.position.x - finalX;
                        const dz = tree.position.z - finalZ;
                        if (Math.sqrt(dx * dx + dz * dz) < 0.5) {
                            tooClose = true;
                            break;
                        }
                    }

                    if (!tooClose && Math.random() < zone.density) {
                        const tree = Tree.createMesh(finalX, finalZ);
                        tree.userData.gridX = snappedX;
                        tree.userData.gridZ = snappedZ;
                        tree.userData.isTree = true;

                        this.sceneManager.add(tree);
                        this.trees.push(tree);
                    }
                }
            }
        });

        // Add some scattered individual trees
        for (let i = 0; i < 40; i++) {
            const x = (Math.random() - 0.5) * env.gridSize * 0.9;
            const z = (Math.random() - 0.5) * env.gridSize * 0.9;

            const snappedX = Math.round(x / gridSize) * gridSize;
            const snappedZ = Math.round(z / gridSize) * gridSize;

            const offsetX = (Math.random() - 0.5) * gridSize * 0.3;
            const offsetZ = (Math.random() - 0.5) * gridSize * 0.3;

            const tree = Tree.createMesh(snappedX + offsetX, snappedZ + offsetZ);
            tree.userData.gridX = snappedX;
            tree.userData.gridZ = snappedZ;
            tree.userData.isTree = true;

            this.sceneManager.add(tree);
            this.trees.push(tree);
        }

        console.log(`Created ${this.trees.length} trees with variety`);
    }

    clearTrees() {
        this.trees.forEach(tree => this.sceneManager.remove(tree));
        this.trees = [];
    }

    clearTreesInArea(building) {
        const buildingBox = new THREE.Box3().setFromObject(building);
        buildingBox.expandByScalar(1);

        this.trees = this.trees.filter(tree => {
            const treePos = new THREE.Vector3();
            tree.getWorldPosition(treePos);

            if (buildingBox.containsPoint(treePos)) {
                this.sceneManager.remove(tree);
                return false;
            }
            return true;
        });
    }

    toggleGrid() {
        this.showGrid = !this.showGrid;
        this.gridHelper.visible = this.showGrid;
        document.getElementById('grid-toggle').classList.toggle('active', this.showGrid);
    }

    clearEnvironment() {
        // Clear ground
        if (this.ground) {
            this.ground.geometry.dispose();
            this.ground.material.dispose();
            this.sceneManager.remove(this.ground);
        }

        // Clear grid
        if (this.gridHelper) {
            this.sceneManager.remove(this.gridHelper);
        }

        // Clear stars
        const existingStars = this.sceneManager.scene.children.filter(child =>
            child instanceof THREE.Points && child.material.color.getHex() === 0xffffff
        );
        existingStars.forEach(stars => {
            stars.geometry.dispose();
            stars.material.dispose();
            this.sceneManager.remove(stars);
        });
    }
}