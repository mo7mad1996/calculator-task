import React, { createContext, useState, useContext } from "react";
import { useEdgesState } from "reactflow";

const NodeContext = createContext();

export const NodeProvider = ({ children }) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodesState, setNodesState] = useState({});

  const updateNodeState = (id, state) => {
    setNodesState((prevState) => ({
      ...prevState,
      [id]: state,
    }));
  };

  const state = {
    edges,
    setEdges,
    onEdgesChange,
    nodesState,
    updateNodeState,
  };

  return <NodeContext.Provider value={state}>{children}</NodeContext.Provider>;
};

export const useNodeContext = () => useContext(NodeContext);
