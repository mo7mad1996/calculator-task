// context
import { useNodeContext } from "../../context";

export default function Input({ icon, title, id }) {
  const { updateNodeState } = useNodeContext();

  // methods
  function input(e) {
    updateNodeState(id, +e.target.value);
  }
  return (
    <div className="item">
      <header>
        {icon} {title}
      </header>

      <div className="p-1">
        <input onInput={input} />
      </div>
    </div>
  );
}
