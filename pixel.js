import { Primitive } from "./primitives.js";

export {Pixel}

/*
    Many of the primitives have a lot of duplicated code and I'd love nothing more than to simplify them,
    but I'm not good enough at geometry and at decoding arcane pseudo-assembly C++ code :)

    I'm especially talking about the plane orientation of grids, spirals and ellipses.
    I tried to use reflections and translations but the result was disastrous lol, it would've gone better
    if I was able to iterate more quickly but right now I don't have a renderer and I need to copy-paste
    the .obj files from the console to an online 3d viewer and it's soooo sloooow

    So for now I'm copying the very verbose code from the original, where it gives the formulas explicitly
    on a case-by-case basis. I suppose a switch-case was faster than doing transformations.
*/

const sw_version = "cryxtels2obj v0.4";

class Pixel extends Primitive {
    constructor(name="Pixel") {
        super(name);
        this.primitives = [];
    }

    setAuthor(name) {
        this.author = name;
    }

    setName(name) {
        this.name = name;
    }

    setType(typeNumber) {
        this.type = typeNumber;
    }

    // generate the .obj file for the mesh
    toObjString () {
        let obj = `# generated with ${sw_version}\n`;
        if (this.author !== undefined) {
            obj += `# this pixel was created by ${this.author}\n`;
        }
        obj += `# ${new Date().toISOString()}\n`
        obj += `o ${this.name}\n`;

        for (let v of this.vertices.concat(this.dots)) {
            obj += `v ${v[0]} ${v[1]} ${v[2]}`;
            obj += "\n";
        }
        for (let line of this.lines) {
            obj += "l";
            for (let index of line) {
                obj += ` ${index}`;
            }
            obj += "\n";
        }
        
        return obj;
    }
}