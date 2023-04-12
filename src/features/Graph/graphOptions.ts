import { Options } from "vis-network";

const graphOptions: Options = {
  nodes: {
    shape: "dot",
    size: 16,
    font: {
      size: 12,
      color: "#000000",
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
  // layout: {
  //   randomSeed: 1,
  //   improvedLayout: true,
  //   hierarchical: {
  //     enabled: true,
  //     levelSeparation: 100,
  //     nodeSpacing: 300,
  //     treeSpacing: 100,
  //     blockShifting: false,
  //     edgeMinimization: false,
  //     parentCentralization: true,
  //     direction: "LR", // UD, DU, LR, RL
  //     sortMethod: "directed", // hubsize, directed
  //     shakeTowards: "roots", // roots, leaves
  //   },
  // },
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

export default graphOptions;
