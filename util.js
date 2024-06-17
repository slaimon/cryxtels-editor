import * as THREE from "three"
export {tsin, tcos, vec3, vector_constants}

function tsin(x) {
    x = Math.floor(x);
    if (x<0 || x>=720) {
        console.log(`TSIN WARNING: non-legacy argument ${x}`);
    }
    return Math.sin(x*Math.PI/180);
}

function tcos(x) {
    x = Math.floor(x);
    if (x<0 || x>=720) {
        console.log(`TCOS WARNING: non-legacy argument ${x}`);
    }
    return Math.cos(x*Math.PI/180);
}

function vec3(array) {
    return new THREE.Vector3(array[0], array[1], array[2]);
}

const vector_constants = {
    XAxis : new THREE.Vector3(1,0,0),
    YAxis : new THREE.Vector3(0,1,0),
    ZAxis : new THREE.Vector3(0,0,1),
    XYNormal : new THREE.Vector3(Math.SQRT1_2, Math.SQRT1_2, 0),
    XZNormal : new THREE.Vector3(Math.SQRT1_2, 0, Math.SQRT1_2),
    YZNormal : new THREE.Vector3(0, Math.SQRT1_2, Math.SQRT1_2)
};