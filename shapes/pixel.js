import { Shape } from "./primitives.js";
import { vector_constants, vec3 } from "./util.js";
import { Ship } from "./ship.js";
import * as THREE from "three";

export {Pixel}

const sw_version = "Cryxtels Online Editor v0.5";

class Pixel extends Shape {
    constructor(name="Pixel") {
        super(name);
        this.primitives = [];
    }

    setAuthor (name) {
        this.author = name;
    }

    setName (name) {
        this.name = name;
    }

    setType (typeNumber) {
        this.type = typeNumber;
        this.supportsLanding = true;
    }

    setModel (modelNumber) {
        this.model = modelNumber;
        this.supportsLanding = false;
    }

    setDockPosition (c) {
        this.dockPosition = vec3(c);
        this.hasDock = true;
    }

    addShip (axis, angle) {
        if (this.hasShip)
            return;
        if (!this.hasDock)
            return;
        if (!this.supportsLanding)
            return;

        let ship = new Ship();
        if (axis && angle) {
            ship.Rotate(axis, angle);
        }
        else {
            ship.Rotate(vector_constants.YAxis, Math.random()*2.0*Math.PI)
        }
        ship.Translate(this.dockPosition.add(new THREE.Vector3(0,-16,0)));
        this.Add(ship);

        this.hasShip = true;
    }

    // generate the .obj file for the mesh
    toObjString () {
        let obj = `# generated with ${sw_version}\n`;

        if (this.author !== undefined) {
            obj += `# this pixel was created by ${this.author}\n`;
        }
        if (this.supportsLanding) {
            obj += `# type number ${this.type}`;
        }
        else {
            obj += `# model number ${this.model}`;
        }

        if (this.name !== "Pixel") {
            obj += ` aka ${this.name}\n`;
        }
        else {
            obj += `\n`;
        }
        obj += `# ${new Date().toISOString()}\n`
        obj += `o ${this.name}\n`;

        this.Rotate(vector_constants.ZAxis, Math.PI);
        this.Scale(0.03, {inputType:"scalar"});
        for (let v of this.vertices.concat(this.dots)) {
            obj += `v ${v.x} ${v.y} ${v.z}`;
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