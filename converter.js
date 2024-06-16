import * as THREE from "three"
export {createThreeLineMesh}

const material = new THREE.LineBasicMaterial({color: 0x0000ff});

function createThreeLineMesh(mesh) {
    let lineCount = mesh.LineCount ();
    if (lineCount === 0) {
        return null;
    }

    let threeGeometry = new THREE.BufferGeometry ();

    let vertices = [];
    for (let line of mesh.lines) {
        for (let i = 0; i < line.length; i++) {
            let vertexIndex = line[i]-1;
            let vertex = mesh.vertices[vertexIndex];
            vertices.push (vertex[0], vertex[1], vertex[2]);
            if (i > 0 && i < line.length - 1) {
                vertices.push (vertex[0], vertex[1], vertex[2]);
            }
        }
    }

    threeGeometry.setAttribute ('position', new THREE.Float32BufferAttribute (vertices, 3));

    let threeLine = new THREE.LineSegments (threeGeometry, material);
    return threeLine;
}