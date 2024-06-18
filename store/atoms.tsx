import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { Edge, Node } from "reactflow";
import { initialEdges, initialNodes } from "../constants";

const storage: any = createJSONStorage(() => localStorage);

const nodesArrAtom = atomWithStorage<Node[]>("nodesArr", initialNodes, storage);
const edgesArrAtom = atomWithStorage<Edge[]>("edgesArr", initialEdges, storage);
const reactflowInstanceAtom = atomWithStorage<any>(
  "reactflowInstance",
  {},
  storage
);
const rfInstanceAtom = atom<any>({});
const selectedNodeAtom = atom<any>({});

export {
  nodesArrAtom,
  edgesArrAtom,
  reactflowInstanceAtom,
  rfInstanceAtom,
  selectedNodeAtom,
};
