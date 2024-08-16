import * as OV from "o3dv"

export function initializeViewer(parentElement) {
    const parameters = {
        backgroundColor: new OV.RGBColor(33,33,33),
        defaultLineColor: new OV.RGBColor(154, 218, 250)
    }
    const viewer = new OV.EmbeddedViewer(parentElement, parameters);

    return viewer;
}