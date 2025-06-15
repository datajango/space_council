// js/objects/Tree.js
class Tree {
    static createMesh(x, z) {
        const treeGroup = new THREE.Group();

        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2, 8);
        const trunkMaterial = new THREE.MeshPhongMaterial({ color: CONSTANTS.COLORS.TREE_TRUNK });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1;
        trunk.castShadow = true;
        trunk.receiveShadow = true;

        // Tree foliage
        const foliageGeometry = new THREE.SphereGeometry(1.5, 8, 6);
        const foliageMaterial = new THREE.MeshPhongMaterial({ color: CONSTANTS.COLORS.TREE_FOLIAGE });

        const foliage1 = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage1.position.y = 3;
        foliage1.castShadow = true;
        foliage1.receiveShadow = true;

        const foliage2 = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage2.position.set(0.5, 3.5, 0.5);
        foliage2.scale.set(0.8, 0.8, 0.8);
        foliage2.castShadow = true;

        const foliage3 = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage3.position.set(-0.5, 3.5, -0.5);
        foliage3.scale.set(0.7, 0.7, 0.7);
        foliage3.castShadow = true;

        treeGroup.add(trunk);
        treeGroup.add(foliage1);
        treeGroup.add(foliage2);
        treeGroup.add(foliage3);

        treeGroup.position.set(x, 0, z);

        // Add variation
        treeGroup.rotation.y = Math.random() * Math.PI * 2;
        const scale = 0.8 + Math.random() * 0.4;
        treeGroup.scale.set(scale, scale, scale);

        return treeGroup;
    }
}
