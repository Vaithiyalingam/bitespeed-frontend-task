import { useAtom } from "jotai/react";
import { selectedNodeAtom } from "./atoms";

export const useSelectedNode = () => {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

  const handleSelectedNode = (node: any) => {
    setSelectedNode(node);
  };
  return { selectedNode, handleSelectedNode };
};
