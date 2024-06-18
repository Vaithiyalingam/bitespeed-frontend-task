"use client";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { reactflowInstanceAtom, rfInstanceAtom } from "./atoms";
import { useSelectedNode } from "./useSelectedNode";

export const useSaveRestoreFlow = () => {
  // Atom hooks
  const [reactflowInstance, setReactflowInstance] = useAtom(
    reactflowInstanceAtom
  );
  const [rfInstance, setRfInstance] = useAtom(rfInstanceAtom);

  // Local state for save operation result
  const [saveResult, setSaveResult] = useState({
    success: false,
    showToast: false,
  });

  // Hook for managing selected node state
  const { selectedNode, handleSelectedNode } = useSelectedNode();

  // Function to save the flow
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      if (
        flow.nodes.length === 1 ||
        flow.nodes.length - 1 === flow.edges.length
      ) {
        // If conditions for saving the flow are met
        setReactflowInstance(flow); // Update reactflowInstance with the new flow
        setSaveResult({ success: true, showToast: true });
        setTimeout(() => {
          setSaveResult({ success: false, showToast: false });
        }, 3000);
        if (selectedNode.id) {
          handleSelectedNode({}); // Reset selected node state
        }
      } else {
        setSaveResult({ success: false, showToast: true });
        setTimeout(() => {
          setSaveResult({ success: false, showToast: false });
        }, 3000);
      }
    }
  }, [rfInstance, setReactflowInstance, handleSelectedNode, selectedNode.id]);

  return {
    setRfInstance,
    rfInstance,
    onSave,
    setReactflowInstance,
    reactflowInstance,
    reactflowInstanceAtom,
    saveResult,
  };
};
