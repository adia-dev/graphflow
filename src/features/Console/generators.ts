import { DataSet } from "vis-data";
import { Edge, Node } from "vis-network";

const RE_MATRIX = /^\s*\[(\s*\[\s*(\d+\s*,\s*)*\d+\s*\]\s*,?\s*)*\]\s*$/;
// const RE_ADJACENCY_LIST =
//   /^\s*\[\s*((\d+\s*,\s*\d+\s*(,\s*\d+)?\s*)\s*,?\s*)*\]\s*$/;

function formatMatrix(value: string): string {
  if (value.length <= 20) {
    return value.replace(/\s/g, "");
  } else {
    return value.replace(/\s/g, "").replace(/(\d+),(\d+)/g, "$1,$2");
  }
}

function validateInput(input: string | undefined, regex: RegExp): boolean {
  if (input) {
    const formattedInput = formatMatrix(input);
    const isValid = regex.test(formattedInput);

    return isValid;
  }
  return false;
}

function generateFromEdgeList(input: string): {
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  formattedInput?: string;
} | null {
  if (input && validateInput(input, RE_MATRIX)) {
    const formattedInput = formatMatrix(input);
    let matrix: number[][] = JSON.parse(formattedInput);
    let edgeList = new Map<number, number[]>();
    const nodeSet = new Set<number>();
    for (const [from, to] of matrix) {
      nodeSet.add(from);
      nodeSet.add(to);
      if (edgeList.has(from)) {
        edgeList.get(from)!.push(to);
      } else {
        edgeList.set(from, [to]);
      }
    }

    const nodes = Array.from(nodeSet.keys()).map((val) => {
      return {
        id: val,
        label: val.toString(),
        color: "#6366f1",
      };
    });

    const edges = Array.from(edgeList.entries())
      .map(([node, neighbors]) => {
        return neighbors.map((neighbor: number) => {
          return {
            from: node,
            to: neighbor,
          };
        });
      })
      .flat();

    const edgesDataSet = new DataSet<Edge>(edges, {});
    const nodesDataSet = new DataSet<Node>(nodes, {});

    return {
      nodes: nodesDataSet,
      edges: edgesDataSet,
      formattedInput,
    };
  } else {
    return null;
  }
}

function generateFromMatrix(input: string): {
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  formattedInput?: string;
} | null {
  if (input && validateInput(input, RE_MATRIX)) {
    const formattedInput = formatMatrix(input);
    let matrix: (number | string)[][] = JSON.parse(formattedInput);

    // get the max width based on each row of the matrix
    let width = 0;
    matrix.forEach((row) => (width = Math.max(width, row.length)));

    // fill the matrix with `null` where the width of the row is less than the width of the matrix
    matrix = matrix.map((row) =>
      row.length < width
        ? [...row, ...Array(width - row.length).fill(null)]
        : row
    );

    const nodes = matrix
      .map((row, i) =>
        row.map((val, j) => {
          return {
            id: i * 10 + j,
            x: j * 100,
            y: i * 100,
            label: val ? val.toString() : "-",
            color: val ? "#6366f1" : "#ffffff25",
          };
        })
      )
      .flat();

    const edges = [];
    const edgeSet = new Set<string>();

    for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < width; ++j) {
        const key = `${i}${j}${j}${i}`;

        if (edgeSet.has(key)) continue;

        if (j - 1 >= 0) {
          edges.push({
            from: i * 10 + j,
            to: i * 10 + j - 1,
            color: matrix[i][j] && matrix[i][j - 1] ? "#6366f1" : "#ffffff25",
          });
          edgeSet.add(key);
        }

        if (i - 1 >= 0) {
          edges.push({
            from: i * 10 + j,
            to: (i - 1) * 10 + j,
            color: matrix[i][j] && matrix[i - 1][j] ? "#6366f1" : "#ffffff25",
          });
          edgeSet.add(key);
        }
      }
    }

    const edgesDataSet = new DataSet<Edge>(edges, {});
    const nodesDataSet = new DataSet<Node>(nodes, {});

    return {
      nodes: nodesDataSet,
      edges: edgesDataSet,
      formattedInput,
    };
  } else {
    return null;
  }
}

export { generateFromEdgeList, generateFromMatrix, formatMatrix };
