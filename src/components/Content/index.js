// css
import "./style.css";

// icons
import { IoMenuOutline } from "react-icons/io5";
import { FcMultipleInputs } from "react-icons/fc";
import { LuFolderOutput } from "react-icons/lu";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { TbMultiplier2X } from "react-icons/tb";
import { TbDivide } from "react-icons/tb";
import { useState } from "react";

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

  const [active, setActive] = useState(null);
  const [elements, setElements] = useState([]);

  // methods
  function drop(e) {
    setElements((a) => [
      ...a,
      {
        ...{ x: e.nativeEvent.layerX, y: e.nativeEvent.layerY }, // postion
        ...components[active],
      },
    ]);
  }

  return (
    <section className="row">
      <aside>
        {components.map((component, n) => (
          <Item key={n} component={component} n={n} setActive={setActive} />
        ))}
      </aside>
      <main onDrop={drop} onDragOver={(e) => e.preventDefault()}>
        {elements.map((i, n) => (
          <ReadyItem key={n} {...i} />
        ))}
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

function ReadyItem(i) {
  return (
    <div className="item" style={{ left: i.x, top: i.y }}>
      <header>
        {i.icon} {i.title}
      </header>
      <div className="p-1">
        <input />
      </div>
    </div>
  );
}
