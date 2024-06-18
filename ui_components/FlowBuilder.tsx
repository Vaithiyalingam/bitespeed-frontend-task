import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  MarkerType,
  Node,
  OnNodesChange,
  ReactFlowProvider,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import NodesComponent from "./NodesComponent";
import { useSaveRestoreFlow } from "../store/useSaveRestoreFlow";
import { useSelectedNode } from "../store/useSelectedNode";

// Node types mapping
const nodeTypes = {
  messages: NodesComponent,
};

// Props interface for FlowBuilder component
export interface IFlowBuilderProps {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  onNodesChange: OnNodesChange;
}

const FlowBuilder: React.FC<IFlowBuilderProps> = ({
  nodes,
  setNodes,
  onNodesChange,
}) => {
  // Hooks from custom hooks and react-flow
  const { reactflowInstance, setRfInstance } = useSaveRestoreFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    reactflowInstance?.edges || []
  );
  const { setViewport } = useReactFlow();
  const { handleSelectedNode } = useSelectedNode();

  // On mount, restore flow if instance exists
  useEffect(() => {
    if (reactflowInstance) {
      restoreFlow();
    }
  }, [reactflowInstance]);

  // Restore flow function
  const restoreFlow = useCallback(() => {
    const { viewport, nodes, edges } = reactflowInstance;

    if (viewport) {
      const { x = 0, y = 0, zoom = 1 } = viewport;
      setNodes(nodes || []);
      setEdges(edges || []);
      setViewport({ x, y, zoom });
    } else {
      console.error("Viewport is undefined");
    }
  }, [reactflowInstance, setNodes, setEdges, setViewport]);

  // On connect callback
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        id: `${edges.length + 1}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges.length, setEdges]
  );

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-300");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-300");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.currentTarget.classList.remove("bg-gray-300");

    const data = e.dataTransfer.getData("text/plain");

    // Create a new node with unique ID, position, message, and type
    const newNode = {
      id: `${nodes.length > 0 ? nodes.length : 0}`, // Unique ID for the node
      position: {
        x: Number(`${nodes.length > 0 ? nodes.length + 1 : 1}0`), // X position based on number of nodes
        y: Number(`${nodes.length > 0 ? nodes.length + 1 : 1}0`), // Y position based on number of nodes
      },
      data: {
        message: `message ${nodes.length > 0 ? nodes.length + 1 : 1}`, // Unique message for the node
      },
      type: data, // Type of the node based on the dropped item
    };

    // Update the nodes state by adding the new node
    setNodes([...nodes, newNode]);
  };

  return (
    <div
      className="w-[calc(100%-20px)] h-[calc(100vh-54px)]"
      id="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => handleSelectedNode(node)}
        onInit={setRfInstance}
        fitView
      />
    </div>
  );
};

// FlowBuilder wrapped with ReactFlowProvider
export const FlowWithProvider: React.FC<IFlowBuilderProps> = ({
  nodes,
  setNodes,
  onNodesChange,
}) => {
  return (
    <ReactFlowProvider>
      <FlowBuilder
        nodes={nodes}
        setNodes={setNodes}
        onNodesChange={onNodesChange}
      />
    </ReactFlowProvider>
  );
};
