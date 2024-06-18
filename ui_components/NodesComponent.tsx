import React from "react";
import { Position } from "reactflow";
import CustomHandle from "./CustomHandle";
import { useSelectedNode } from "../store/useSelectedNode";
import Image from "next/image";
import { icons } from "../utils/icons";

export default function NodesComponent(data: any) {
  const { selectedNode } = useSelectedNode();

  return (
    <div
      className={`bg-white shadow-lg w-[150px] rounded-md ${
        selectedNode.id === data.id ? "border border-black" : ""
      }`}
    >
      {/* CustomHandle for incoming connections */}
      <CustomHandle type="target" position={Position.Left} />

      {/* Header section */}
      <div className="bg-green-200 rounded-t-md p-1 flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <Image
            className="!w-2 !h-2"
            src={icons.messageBlack}
            alt="message_black"
          />
          <p className="text-[8px] font-medium">Send Message</p>
        </div>
        <Image
          className="!w-2 !h-2"
          src={icons.whatsappLogo}
          alt="whatsapp_logo"
        />
      </div>

      {/* Main content section */}
      <div className="p-2 w-full max-h-8 overflow-y-auto">
        <p className="text-[8px] font-medium text-wrap">{data.data.message}</p>
      </div>

      {/* CustomHandle for outgoing connections */}
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
}
