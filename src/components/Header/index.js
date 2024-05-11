// css
import "./style.css";

// images
import logo from "../../images/logo.svg";

// icons
import { CgMenuRightAlt } from "react-icons/cg";

export default function Header() {
  return (
    <header className="App-header row">
      <aside>
        <img src={logo} className="App-logo" alt="logo" />

        <CgMenuRightAlt />
      </aside>
      <main></main>
    </header>
  );
}
