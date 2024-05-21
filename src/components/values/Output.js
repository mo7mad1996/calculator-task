import { useEffect } from "react";
import { useNodeContext } from "../../context";

export default function Output({ icon, title, id }) {
  const { nodesState, edges, updateNodeState } = useNodeContext();

  // watch
  useEffect(() => {
    edges
      .filter((e) => e.target === id)
      .forEach((edge) => updateNodeState(id, nodesState[edge.source]));
  }, [nodesState, edges, id, updateNodeState]);

  return (
    <div className="item">
      <header>
        {icon} {title}
      </header>
      <div className="p-1 fs">{nodesState[id]}</div>
    </div>
  );
}
