"use client";
import React from "react";
import  {
  useNodesState,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import { FlowWithProvider } from "../../ui_components/FlowBuilder";
import { Panel } from "../../ui_components/Panel";
import { useSaveRestoreFlow } from "../../store/useSaveRestoreFlow";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 50 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 100 }, data: { label: "3" } },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
export default function Home() {

  const { reactflowInstance } = useSaveRestoreFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    reactflowInstance?.nodes || []
  );

  return (
    <div className="mt-[54px] grid grid-cols-6">
      <div className="col-span-5">
        <FlowWithProvider
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
        />
      </div>
      <div className="col-span-1">
        <Panel nodes={nodes} setNodes={setNodes} />
      </div>
    </div>
  );
}
