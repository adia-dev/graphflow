import { TbChartGridDots, TbEdit } from "react-icons/tb";
import { IGraphBuilder } from "./IGraphBuilder";
import { VscListTree } from "react-icons/vsc";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { MdOutlineDataset } from "react-icons/md";
import { BiCodeCurly } from "react-icons/bi";

const builders: IGraphBuilder[] = [
  {
    index: 0,
    value: "matrix",
    label: "Matrix",
    shortDescription:
      "A matrix of numbers that represent the weights of the edges connected to each node",
    tooltip:
      "A matrix of numbers that represent the weights of the edges connected to each node",
    icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    // write a longer and more precise description
    description:
      "A matrix of numbers that represent the weights of the edges connected to each node, if there is no edge between two nodes, the value is 0, if the value is 0, the node and edge are displayed with a dimmed brightness",
    example: "[[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]]",
    exampleValue: "[[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]]",
  },
  {
    index: 1,
    value: "adjacency-matrix",
    label: "Adjacency Matrix",
    shortDescription:
      "A matrix of numbers(0 or 1) that represent the edges connected to each node",
    tooltip:
      "A matrix of numbers(0 or 1) that represent the edges connected to each node",
    icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description:
      "A matrix of numbers(0 or 1) that represent the edges connected to each node, if there is no edge between two nodes, the value is 0, if the value is 0, the node and edge are displayed with a dimmed brightness",
    example: "[[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]]",
    exampleValue: "[[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]]",
  },
  {
    index: 2,
    value: "adjacency-list",
    label: "Adjacency List",
    shortDescription: "A list of nodes and the edges connected to each node",
    tooltip: "A list of nodes and the edges connected to each node",
    icon: <VscListTree className="w-10 h-10 text-gray-500" />,
    description:
      "A list of nodes and the edges connected to each node, each node is a list of edges, each edge is a pair of nodes, the third value is optional and represents the weight of the edge",
    example: "[[0, [1, 3]], [1, [0, 2]], [2, [1, 3]], [3, [0, 2]]]",
    exampleValue: "[[0, [1, 3]], [1, [0, 2]], [2, [1, 3]], [3, [0, 2]]]",
  },
  {
    index: 3,
    value: "edge-list",
    label: "Edge List",
    shortDescription:
      "A list of edges used to build the graph, each edge is a pair of nodes",
    tooltip: "A list of edges",
    icon: <TfiLayoutGrid4Alt className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description:
      "A list of edges used to build the graph, each edge is a pair of nodes, the third value is optional and represents the weight of the edge",
    example:
      "[[0, 1], [1, 2], [2, 3], [3, 0]], with weights: [[0, 1, 1], [1, 2, 2], [2, 3, 3], [3, 0, 4]]",
    exampleValue: "[[0, 1], [1, 2], [2, 3], [3, 0]]",
  },
  {
    index: 4,
    value: "incidence-matrix",
    label: "Incidence Matrix",
    shortDescription:
      "A matrix of numbers(0, 1 or -1) that represent the edges connected to each node",
    tooltip:
      "A matrix of numbers(0 or 1) that represent the edges connected to each node",
    icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description:
      "A matrix of numbers(0, 1 or -1) that represent the edges connected to each node, if there is no edge between two nodes, the value is 0, if the value is 0, the node and edge are displayed with a dimmed brightness, -1 represents a directed edge from the first node to the second node, 1 represents a directed edge from the second node to the first node",
    example: "[[0, 1, 0, 0], [1, 0, -1, 0], [0, 1, 0, -1], [0, 0, 1, 0]]",
    exampleValue: "[[0, 1, 0, 0], [1, 0, -1, 0], [0, 1, 0, -1], [0, 0, 1, 0]]",
  },
  {
    index: 5,
    value: "adjacency-set",
    label: "Adjacency Set",
    shortDescription: "A list of nodes and the edges connected to each node",
    tooltip: "A list of nodes and the edges connected to each node",
    icon: <MdOutlineDataset className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description:
      "A list of nodes and the edges connected to each node, each node is a set of edges, each edge is a pair of nodes, the third value is optional and represents the weight of the edge",
    example:
      "[[1, 2], [0, 2], [1, 3], [2]], with weights: [[1, 2, 1], [0, 2, 2], [1, 3, 3], [2, 3, 4]]",
    exampleValue: "[[1, 2], [0, 2], [1, 3], [2]]",
  },
  {
    index: 6,
    value: "hybrid",
    label: "Hybrid",
    shortDescription:
      "Build your graph using a combination of the above methods in multiple steps",
    tooltip:
      "Build your graph using a combination of the above methods in multiple steps",
    icon: <TbEdit className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description:
      "Build your graph using a combination of the above methods in multiple steps",
    example:
      "1st step: - Adjacency Matrix, 2nd step: - Edge List, 3rd step: - Incidence Matrix, ...",
    exampleValue: "",
  },
  {
    index: 7,
    value: "custom-code",
    label: "Custom code",
    shortDescription: "Access a custom code editor to build your graph",
    tooltip: "Access a custom code editor to build your graph",
    icon: <BiCodeCurly className="w-10 h-10 text-gray-500" />,
    notimplemented: true,
    description: "Access a custom code editor to build your graph",
    example: "fn build_graph() -> Graph { ... }",
    exampleValue: "fn build_graph() -> Graph { ... }",
  },
];


export default builders;