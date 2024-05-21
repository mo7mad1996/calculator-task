// components
import Add from "../mathematicalCalculations/Add";
import Divide from "../mathematicalCalculations/Divide";
import Multiply from "../mathematicalCalculations/Divide";
import Subtract from "../mathematicalCalculations/Subtract";
import Input from "../values/Input";
import Output from "../values/Output";

// css
import "./style.css";
import "reactflow/dist/style.css";

// icons
import { IoMenuOutline } from "react-icons/io5";
import { FcMultipleInputs } from "react-icons/fc";
import { LuFolderOutput } from "react-icons/lu";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { TbMultiplier2X } from "react-icons/tb";
import { TbDivide } from "react-icons/tb";
import { useEffect, useState } from "react";

import ReactFlow, { addEdge, useNodesState } from "reactflow";

// cntext
import { useNodeContext } from "../../context";

export default function Content() {
  const components = [
    {
      icon: <FcMultipleInputs />,
      title: "Input",
    },
    {
      icon: <LuFolderOutput />,
      title: "Output",
    },
    {
      icon: <GrAddCircle />,
      title: "Add",
    },
    {
      icon: <GrSubtractCircle />,
      title: "Subtract",
    },
    {
      icon: <TbMultiplier2X />,
      title: "Multiply",
    },
    {
      icon: <TbDivide />,
      title: "Divide",
    },
  ];

  // state
  const [active, setActive] = useState(null);

  // context
  const { nodesState, updateNodeState, edges, setEdges, onEdgesChange } =
    useNodeContext();

  // react-flow
  const [elements, setElements, onElementChange] = useNodesState([]);

  // methods
  function drop(e) {
    e.preventDefault();
    const id = e.timeStamp.toString();

    updateNodeState(id, null);

    setElements((a) => [
      ...a,
      {
        id,
        position: handleMouseMove(e), // postion
        data: {
          label: <Element element={{ ...components[active], id }} />,
        },
        draggable: true, // Make the node draggable
      },
    ]);
  }

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left - 150 / 2;
    const y = event.clientY - rect.top - 30;
    return { x, y };
  };

  const onConnect = (params) => {
    updateNodeState(params.target, nodesState[params.source]);
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <section className="row">
      <aside>
        {components.map((component, n) => (
          <Item key={n} component={component} n={n} setActive={setActive} />
        ))}
      </aside>
      <main onDrop={drop} onDragOver={(e) => e.preventDefault()}>
        <ReactFlow
          nodes={elements}
          onConnect={onConnect}
          edges={edges}
          onNodesChange={onElementChange}
          onEdgesChange={onEdgesChange}
        />
      </main>
    </section>
  );
}

function Item({ component, setActive, n }) {
  return (
    <div
      className="item"
      draggable
      onDragStart={() => setActive(n)}
      onDragEnd={() => setActive(null)}
    >
      <span className="title">
        {component.icon}
        {component.title}
      </span>

      <IoMenuOutline className="menu-btn" />
    </div>
  );
}

function Element({ element }) {
  const components = {
    Add: <Add {...element} />,
    Subtract: <Subtract {...element} />,
    Multiply: <Multiply {...element} />,
    Divide: <Divide {...element} />,
    Input: <Input {...element} />,
    Output: <Output {...element} />,
  };

  return components[element.title];
}
