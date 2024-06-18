import { Node } from "reactflow";
import { useSelectedNode } from "../store/useSelectedNode";
import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import { icons } from "../utils/icons";

export interface IPanelProps {
  nodes: Node<any, string | undefined>[];
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
}

export const Panel: FC<IPanelProps> = ({ nodes, setNodes }) => {
  // Handler for starting the drag event, sets the data transfer type to "messages"
  const handleMessageDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "messages");
  };

  const { selectedNode, handleSelectedNode } = useSelectedNode();

  // Handler for changing the text of the selected node
  const handleTextChange = (val: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((item) => {
        if (item.id === selectedNode.id) {
          return { ...item, data: { ...item.data, message: val } };
        } else {
          return item;
        }
      })
    );
  };

  // Function to get the value of the selected node
  const getNodeValue = () => {
    return nodes.find((item) => item.id === selectedNode.id);
  };

  const selectedNodeValue = getNodeValue();

  return (
    <div className="border-l border-gray-300 w-full h-full">
      {selectedNode.id ? (
        // If a node is selected, render the node details
        <div className="flex flex-col">
          <div className="p-2 w-full flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => handleSelectedNode({})}
            >
              <Image src={icons.backArrow} alt="back_arrow" />
            </div>
            <div className="flex-grow text-center">
              <p className="text-black">Messages</p>
            </div>
          </div>
          <div className="px-4 py-4 border-y border-gray-300">
            <p className="text-gray-400 text-xs">Text</p>
            <textarea
              className="border border-gray-300 w-full mt-2 rounded-lg p-2 text-xs"
              value={selectedNodeValue?.data.message || ""}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        // If no node is selected, render the draggable message box
        <div
          className="border flex flex-col items-center px-5 border-blue-900 cursor-pointer text-blue-900 rounded-md py-4 w-fit mt-5 ml-5"
          id="draggable"
          draggable
          onDragStart={handleMessageDragStart}
        >
          <Image src={icons.messageBlue} alt="message_blue" />
          <p className="font-medium text-[12px]">Messages</p>
        </div>
      )}
    </div>
  );
};
