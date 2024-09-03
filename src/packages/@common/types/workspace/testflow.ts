export interface NodesWrapper {
  nodes: {
    id: string;
    type: string;
    data: object;
  }[];
}
export interface EdgesWrapper {
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
}

export interface Testflow extends NodesWrapper, EdgesWrapper {}

export enum TestflowDefault {
  NAME = "New Flow",
}

export interface TestflowWrapper {
  testflow: Testflow;
}
