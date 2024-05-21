import { useEffect, useState } from "react";
import { useNodeContext } from "../../context";

export default function Add({ title, icon, id }) {
  const [nums, setNums] = useState([]);
  const { nodesState, edges, updateNodeState } = useNodeContext();

  useEffect(() => {
    setNums(() =>
      edges.filter((e) => e.target === id).map((e) => nodesState[e.source])
    );
  }, [edges, id, nodesState]);

  useEffect(
    () =>
      updateNodeState(
        id,
        nums.reduce((a, b) => a + b, 0)
      ),
    [nums, id, updateNodeState]
  );

  return (
    <div className="item">
      <header>
        {icon} {title}
      </header>
    </div>
  );
}
