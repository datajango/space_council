// js/core/CameraController.js
class CameraController {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.controls = {
            rotationX: -Math.PI / 6,
            rotationY: 0,
            distance: 50,
            target: new THREE.Vector3(0, 0, 0)
        };

        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };

        this.update();
    }

    update() {
        this.camera.position.x = Math.sin(this.controls.rotationY) * Math.cos(this.controls.rotationX) * this.controls.distance;
        this.camera.position.y = Math.sin(this.controls.rotationX) * this.controls.distance + 20;
        this.camera.position.z = Math.cos(this.controls.rotationY) * Math.cos(this.controls.rotationX) * this.controls.distance;
        this.camera.lookAt(this.controls.target);
    }

    handleMouseDown(event) {
        if (event.button === CONSTANTS.MOUSE.RIGHT) {
            this.isDragging = true;
            this.previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    handleMouseUp() {
        this.isDragging = false;
    }

    handleMouseMove(event) {
        if (this.isDragging) {
            const deltaMove = {
                x: event.clientX - this.previousMousePosition.x,
                y: event.clientY - this.previousMousePosition.y
            };

            this.controls.rotationY += deltaMove.x * 0.01;
            this.controls.rotationX += deltaMove.y * 0.01;
            this.controls.rotationX = Math.max(-Math.PI / 3, Math.min(0, this.controls.rotationX));
            this.update();

            this.previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    handleWheel(event) {
        this.controls.distance += event.deltaY * 0.05;
        this.controls.distance = Math.max(20, Math.min(100, this.controls.distance));
        this.update();
    }

    setDistance(distance) {
        this.controls.distance = distance;
        this.update();
    }

    reset(environment) {
        this.controls.rotationX = -Math.PI / 6;
        this.controls.rotationY = 0;
        this.controls.distance = environment.cameraDistance;
        this.update();
    }
}
