export {tsin, tcos, vec3_compare, vec3_add}

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

function vec3_compare (a, b) {
    let equal = true;
    for (let i=0; i<3; i++) {
        if (a[i] !== b[i]) {
            equal = false;
            break;
        }
    }
    return equal;
}

function vec3_add (a, b) {
    let result = new Array(3);
    for (let i=0; i<3; i++) {
        result[i] = a[i] + b[i]
    }
    return result;
}