const colorScale = d3.scaleOrdinal(["orange", "white"]);
const N = 10; //will be changed
const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  maxR: Math.random() * 20,
  propagationSpeed: (Math.random() - 0.5) * 20 + 1,
  repeatPeriod: Math.random() * 2000 + 200,
}));
console.log(d3.scaleOrdinal);
const labelsTopOrientation = new Set([
  "Test",
  "Luna 2",
  "Luna 20",
  "Luna 21",
  "Luna 24",
  "LCROSS Probe",
]); // avoid label collisions

const catColor = d3.scaleOrdinal(["red", "orange"]);

const getAlt = (d) => d.occurances * 0.002;

const getTooltip = (d) => `
  <div style="text-align: center" class = "${
    d.type == "shallow" ? "shallow" : "deep"
  }">
    <div>${d.name ? "Quake No." : "Quake Date"}: <b>${
  d.name ? d.name : d.date
}</b></div>
    <div>lat: (${d.lat}) lon:(${d.lon})</div>
    <div>Number of occurrences: <em>${
      d.occurances === 50 ? 1 : d.occurances
    }</em></div>
  </div>
`;
const elem = document.getElementById("globeViz");
const moon = Globe()
  .globeImageUrl("./lunar_surface.jpg")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
  .pointLat("lat")
  .pointLng("lon")
  .pointAltitude(getAlt)
  .pointRadius(0.25)
  .pointColor((d) => catColor(d.type))
  .pointLabel(getTooltip)
  .labelLat("lat")
  .labelLng("lon")
  .labelAltitude((d) => getAlt(d))
  .labelDotRadius(0.6)
  .labelDotOrientation(() => "bottom")
  .labelColor((d) => catColor(d.type))
  .labelText("name")
  .labelSize(0.15)
  .labelResolution(1)
  .labelLabel(getTooltip)(document.getElementById("globeViz"));

fetch("./data.json")
  .then((res) => res.json())
  .then((volcanoes) => {
    moon.pointsData(volcanoes).labelsData(volcanoes);
  });
