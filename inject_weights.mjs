import fs from 'fs';

const radarAxes = [
  "stormwaterReliability",
  "heatShadeComfort",
  "maintenancePredictability",
  "ecologicalFunction",
  "longTermCostStability"
];

// Helper to assign logical weights based on system + type
function getWeights(systemName, type) {
  // Base weights mapping for types
  let baseScore = type === "Baseline" ? 1 : type === "Enhanced" ? 3 : 5;
  let weights = {
    stormwaterReliability: baseScore,
    heatShadeComfort: baseScore,
    maintenancePredictability: type === "Baseline" ? 5 : type === "Enhanced" ? 3 : 2, // High perf often means less predictable initial maintenance, or more specialized
    ecologicalFunction: baseScore,
    longTermCostStability: type === "Baseline" ? 1 : type === "Enhanced" ? 4 : 5
  };

  // Adjustments based on system topic
  if (systemName === "Water") {
    weights.stormwaterReliability = type === "Baseline" ? 2 : type === "Enhanced" ? 4 : 5;
  }
  if (systemName === "Tree Cover") {
    weights.heatShadeComfort = type === "Baseline" ? 1 : type === "Enhanced" ? 4 : 5;
  }
  if (systemName === "Habitat & Vegetation") {
    weights.ecologicalFunction = type === "Baseline" ? 1 : type === "Enhanced" ? 4 : 5;
  }

  return weights;
}

const rawData = fs.readFileSync('C:\\Users\\justin.wolters\\Desktop\\SSS Site Systems.json', 'utf8');
const data = JSON.parse(rawData);

data.siteSystems = data.siteSystems.map(system => {
  system.options = system.options.map(opt => {
    opt.radarWeights = getWeights(system.systemName, opt.type);
    return opt;
  });
  return system;
});

fs.writeFileSync('C:\\Users\\justin.wolters\\.gemini\\antigravity\\scratch\\sss-webapp\\src\\data\\siteSystems.json', JSON.stringify(data, null, 2));

console.log("Weights injected successfully.");
