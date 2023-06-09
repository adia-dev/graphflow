import { Options } from "vis-network";

const options: Options = {
  nodes: {
    shape: "dot",
    size: 16,
    font: {
      size: 12,
      color: "inherit",
    },
    borderWidth: 2,
  },
  edges: {
    width: 2,
    smooth: false,
    arrows: {
      to: { enabled: true, scaleFactor: 0.5 },
    },
  },
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
    selectable: true,
    selectConnectedEdges: true,
    // navigationButtons: true,
    // keyboard: {
    //   enabled: true,
    //   speed: { x: 10, y: 10, zoom: 0.03 },
    //   bindToWindow: true,
    // },
  },
  layout: {
    randomSeed: 1,
    improvedLayout: false,
    hierarchical: {
      enabled: false,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: "UD", // UD, DU, LR, RL
      sortMethod: "directed", // hubsize, directed,
      shakeTowards: "roots", // roots, leaves
    },
  },
  physics: {
    enabled: true,
    barnesHut: {
      gravitationalConstant: -80000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0,
    },
    maxVelocity: 146,
    solver: "barnesHut",
    timestep: 0.5,
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100000,
      onlyDynamicEdges: false,
      fit: true,
    },
    adaptiveTimestep: true,
  },
};

const matrixOptions: Options = {
  ...options,
  layout: {
    randomSeed: 1,
    improvedLayout: true,
    hierarchical: {
      enabled: false,
    },
  },
  physics: {
    enabled: false,
  },
};

export default options;
export { matrixOptions };
