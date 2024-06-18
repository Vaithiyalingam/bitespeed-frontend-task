import React from "react";
import { Handle, HandleProps } from "reactflow";

export default function CustomHandle(props: HandleProps) {
  return (
    <Handle
      style={{
        width: 6,
        height: 6,
        background: "black",
        border: "2px solid white",
      }}
      {...props}
    />
  );
}
