// js/objects/Tree.js
class Tree {
    // Define tree types with their characteristics
    static TREE_TYPES = {
        OAK: {
            name: 'oak',
            trunkColor: 0x654321,
            foliageColors: [0x228B22, 0x2E7D32, 0x388E3C],
            foliageType: 'round',
            trunkRadius: { top: 0.1, bottom: 0.15 },
            trunkHeight: 0.8,
            foliageSize: 0.6
        },
        PINE: {
            name: 'pine',
            trunkColor: 0x8B4513,
            foliageColors: [0x0F4C0F, 0x1B5E20, 0x2E7D32],
            foliageType: 'conical',
            trunkRadius: { top: 0.08, bottom: 0.12 },
            trunkHeight: 1.0,
            foliageSize: 0.5
        },
        BIRCH: {
            name: 'birch',
            trunkColor: 0xE8E8E8,
            foliageColors: [0x90EE90, 0x98FB98, 0x7CFC00],
            foliageType: 'round',
            trunkRadius: { top: 0.08, bottom: 0.1 },
            trunkHeight: 0.9,
            foliageSize: 0.5
        },
        MAPLE: {
            name: 'maple',
            trunkColor: 0x5D4037,
            foliageColors: [0xFF6347, 0xFF8C00, 0xFFD700, 0x228B22],
            foliageType: 'round',
            trunkRadius: { top: 0.1, bottom: 0.14 },
            trunkHeight: 0.7,
            foliageSize: 0.65
        },
        MAGNOLIA: {
            name: 'magnolia',
            trunkColor: 0x696969,
            foliageColors: [0xFFF0F5, 0xFFE4E1, 0xFFC0CB, 0xFFB6C1],
            foliageType: 'round',
            trunkRadius: { top: 0.15, bottom: 0.2 },
            trunkHeight: 0.8,
            foliageSize: 0.7
        },
        CHERRY: {
            name: 'cherry',
            trunkColor: 0x8B4513,
            foliageColors: [0xFFB6C1, 0xFFC0CB, 0xFFE4E1],
            foliageType: 'round',
            trunkRadius: { top: 0.08, bottom: 0.12 },
            trunkHeight: 0.65,
            foliageSize: 0.55
        }
    };

    // Size variations
    static SIZE_VARIATIONS = {
        SAPLING: { scale: 0.3, name: 'sapling' },
        YOUNG: { scale: 0.5, name: 'young' },
        MEDIUM: { scale: 0.7, name: 'medium' },
        MATURE: { scale: 0.85, name: 'mature' },
        OLD: { scale: 1.0, name: 'old' }
    };

    static createMesh(x, z) {
        const treeGroup = new THREE.Group();

        // Randomly select tree type
        const treeTypes = Object.values(Tree.TREE_TYPES);
        const selectedType = treeTypes[Math.floor(Math.random() * treeTypes.length)];

        // Randomly select size
        const sizes = Object.values(Tree.SIZE_VARIATIONS);
        const selectedSize = sizes[Math.floor(Math.random() * sizes.length)];

        // Randomly select foliage color from the tree type's available colors
        const foliageColor = selectedType.foliageColors[
            Math.floor(Math.random() * selectedType.foliageColors.length)
        ];

        // Create trunk
        const trunk = Tree.createTrunk(selectedType);
        treeGroup.add(trunk);

        // Create foliage based on type
        const foliage = Tree.createFoliage(selectedType, foliageColor);
        treeGroup.add(foliage);

        // Position and scale the tree
        treeGroup.position.set(x, 0, z);
        treeGroup.rotation.y = Math.random() * Math.PI * 2;

        // Apply size variation with some randomness
        const scaleVariation = 0.7 + Math.random() * 0.3;
        const finalScale = selectedSize.scale * scaleVariation;
        treeGroup.scale.set(finalScale, finalScale, finalScale);

        // Store tree data
        treeGroup.userData = {
            type: selectedType.name,
            size: selectedSize.name,
            foliageColor: foliageColor
        };

        return treeGroup;
    }

    static createTrunk(treeType) {
        const trunkGeometry = new THREE.CylinderGeometry(
            treeType.trunkRadius.top,
            treeType.trunkRadius.bottom,
            treeType.trunkHeight,
            8
        );
        const trunkMaterial = new THREE.MeshPhongMaterial({
            color: treeType.trunkColor
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = treeType.trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;

        // Add trunk details for certain tree types
        if (treeType.name === 'birch') {
            // Add dark stripes to birch trees
            const stripeMaterial = new THREE.MeshPhongMaterial({
                color: 0x333333,
                transparent: true,
                opacity: 0.3
            });
            for (let i = 0; i < 3; i++) {
                const stripeGeometry = new THREE.CylinderGeometry(
                    treeType.trunkRadius.top * 1.01,
                    treeType.trunkRadius.bottom * 1.01,
                    0.05,
                    8
                );
                const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
                stripe.position.y = (i - 1) * 0.2;
                trunk.add(stripe);
            }
        }

        return trunk;
    }

    static createFoliage(treeType, color) {
        const foliageGroup = new THREE.Group();
        const foliageMaterial = new THREE.MeshPhongMaterial({
            color: color
        });

        switch (treeType.foliageType) {
            case 'round':
                foliageGroup.add(Tree.createRoundFoliage(treeType, foliageMaterial));
                break;
            case 'conical':
                foliageGroup.add(Tree.createConicalFoliage(treeType, foliageMaterial));
                break;
            case 'drooping':
                foliageGroup.add(Tree.createDroopingFoliage(treeType, foliageMaterial));
                break;
        }

        foliageGroup.position.y = treeType.trunkHeight;
        return foliageGroup;
    }

    static createRoundFoliage(treeType, material) {
        const foliageGroup = new THREE.Group();

        // Main foliage sphere
        const mainGeometry = new THREE.SphereGeometry(treeType.foliageSize, 8, 6);
        const mainFoliage = new THREE.Mesh(mainGeometry, material);
        mainFoliage.position.y = treeType.foliageSize * 0.3;
        mainFoliage.castShadow = true;
        mainFoliage.receiveShadow = true;
        foliageGroup.add(mainFoliage);

        // Add smaller spheres for variety
        const numClusters = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numClusters; i++) {
            const clusterSize = treeType.foliageSize * (0.5 + Math.random() * 0.3);
            const clusterGeometry = new THREE.SphereGeometry(clusterSize, 6, 4);
            const cluster = new THREE.Mesh(clusterGeometry, material);

            const angle = (i / numClusters) * Math.PI * 2;
            const distance = treeType.foliageSize * 0.5;
            cluster.position.set(
                Math.cos(angle) * distance,
                treeType.foliageSize * 0.5 + Math.random() * 0.5,
                Math.sin(angle) * distance
            );
            cluster.castShadow = true;
            foliageGroup.add(cluster);
        }

        // Special touches for magnolia - add flower details
        if (treeType.name === 'magnolia') {
            const flowerMaterial = new THREE.MeshPhongMaterial({
                color: 0xFFFFFF,
                emissive: 0xFFE4E1,
                emissiveIntensity: 0.2
            });

            // Add some flower accents
            for (let i = 0; i < 5; i++) {
                const flowerGeometry = new THREE.SphereGeometry(
                    treeType.foliageSize * 0.15,
                    6,
                    4
                );
                const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);

                const angle = Math.random() * Math.PI * 2;
                const radius = treeType.foliageSize * (0.7 + Math.random() * 0.3);
                flower.position.set(
                    Math.cos(angle) * radius,
                    treeType.foliageSize * 0.3 + (Math.random() - 0.5) * treeType.foliageSize,
                    Math.sin(angle) * radius
                );
                foliageGroup.add(flower);
            }
        }

        return foliageGroup;
    }

    static createConicalFoliage(treeType, material) {
        const foliageGroup = new THREE.Group();

        // Create multiple cone layers for pine tree effect
        const layers = 3;
        for (let i = 0; i < layers; i++) {
            const layerSize = treeType.foliageSize * (1 - i * 0.25);
            const coneGeometry = new THREE.ConeGeometry(
                layerSize,
                layerSize * 1.2,
                8
            );
            const cone = new THREE.Mesh(coneGeometry, material);
            cone.position.y = i * treeType.foliageSize * 0.4;
            cone.castShadow = true;
            cone.receiveShadow = true;
            foliageGroup.add(cone);
        }

        return foliageGroup;
    }

    static createDroopingFoliage(treeType, material) {
        const foliageGroup = new THREE.Group();

        // Main canopy
        const mainGeometry = new THREE.SphereGeometry(
            treeType.foliageSize,
            8,
            6,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.6
        );
        const mainFoliage = new THREE.Mesh(mainGeometry, material);
        mainFoliage.position.y = treeType.foliageSize * 0.5;
        mainFoliage.castShadow = true;
        mainFoliage.receiveShadow = true;
        foliageGroup.add(mainFoliage);

        // Drooping branches
        const numBranches = 6;
        for (let i = 0; i < numBranches; i++) {
            const angle = (i / numBranches) * Math.PI * 2;
            const branchLength = treeType.foliageSize * 1.5;

            const branchGeometry = new THREE.CylinderGeometry(
                0.02,
                0.06,
                branchLength,
                4
            );
            const branch = new THREE.Mesh(branchGeometry, material);

            branch.position.set(
                Math.cos(angle) * treeType.foliageSize * 0.7,
                0,
                Math.sin(angle) * treeType.foliageSize * 0.7
            );
            branch.rotation.z = Math.PI * 0.3;
            branch.rotation.y = angle;
            branch.castShadow = true;
            foliageGroup.add(branch);
        }

        return foliageGroup;
    }
}