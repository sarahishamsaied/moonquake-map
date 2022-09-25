import { Application } from "@splinetool/runtime";
let link = "https://prod.spline.design/HvqPxKCHYwP6z5Du/scene.splinecode";
const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
if (window.matchMedia("screen and (max-width: 768px)").matches) {
  link = "https://prod.spline.design/OH3FelUamsexR0DI/scene.splinecode";
}
app.load(link);
