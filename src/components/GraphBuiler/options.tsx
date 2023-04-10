import { TbChartGridDots, TbEdit } from "react-icons/tb";
import { IGraphBuilder } from "./IGraphBuilderOption"
import { VscListTree } from "react-icons/vsc";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { MdOutlineDataset } from "react-icons/md";
import { BiCodeCurly } from "react-icons/bi";


export const options: IGraphBuilder[] = [
    {
        value: "matrix",
        label: "Matrix",
        shortDescription: "A matrix of numbers that represent the weights of the edges connected to each node",
        tooltip: "A matrix of numbers that represent the weights of the edges connected to each node",
        icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "adjacency-matrix",
        label: "Adjacency Matrix",
        shortDescription: "A matrix of numbers(0 or 1) that represent the edges connected to each node",
        tooltip: "A matrix of numbers(0 or 1) that represent the edges connected to each node",
        icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "adjacency-list",
        label: "Adjacency List",
        shortDescription: "A list of nodes and the edges connected to each node",
        tooltip: "A list of nodes and the edges connected to each node",
        icon: <VscListTree className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "edge-list",
        label: "Edge List",
        shortDescription: "A list of edges used to build the graph, each edge is a pair of nodes",
        tooltip: "A list of edges",
        icon: <TfiLayoutGrid4Alt className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "incidence-matrix",
        label: "Incidence Matrix",
        shortDescription: "A matrix of numbers(0 or 1) that represent the edges connected to each node",
        tooltip: "A matrix of numbers(0 or 1) that represent the edges connected to each node",
        icon: <TbChartGridDots className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "adjacency-set",
        label: "Adjacency Set",
        shortDescription: "A list of nodes and the edges connected to each node",
        tooltip: "A list of nodes and the edges connected to each node",
        icon: <MdOutlineDataset className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "hybrid",
        label: "Hybrid",
        shortDescription: "Build your graph using a combination of the above methods in multiple steps",
        tooltip: "Build your graph using a combination of the above methods in multiple steps",
        icon: <TbEdit className="w-10 h-10 text-gray-500" />,
    },
    {
        value: "custom-code",
        label: "Custom code",
        shortDescription: "Access a custom code editor to build your graph",
        tooltip: "Access a custom code editor to build your graph",
        icon: <BiCodeCurly className="w-10 h-10 text-gray-500" />,
    },
];