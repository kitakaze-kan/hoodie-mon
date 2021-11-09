import type p5 from "p5";
import { AttributeProps } from "../attributes/createAttribute";
import {setBody, setChest, setEye, setFace, setHead} from "../pixels/base"

let attribute:AttributeProps = {
    name: "",
    backbround: "#f3f3f3",
    mainColor: "#191970",
    subColor: "#1e90ff",
    accentColor: "#ec4079",
    facePoint: [],
    head: 0,
    eye: 0,
    checst: 0
}

export const setAttribute = (a:AttributeProps) => {
    attribute = a
}

export const pixelForSp = (p: p5) => {
    let pc:p5.Graphics
    p.setup = () => { 
        p.createCanvas(175, 175);
        pc = p.createGraphics(160, 160);
        p.noLoop()

        for (let element of document.getElementsByClassName("p5Canvas")) {
            element.addEventListener("contextmenu", (e) => e.preventDefault());
        }
    };
    p.draw = () => {
        p.clear()
        pc.clear()

        p.background(attribute.backbround);
        p.noFill();
        setBody(pc,attribute)
        setFace(pc, attribute)
        setHead(pc, attribute)
        setChest(pc, attribute)
        setEye(pc,attribute)
        p.image(pc, 5, 15)
    };

};