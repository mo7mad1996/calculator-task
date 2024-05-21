// css
import "./App.css";

// components
import Header from "./Header";
import Content from "./Content";

// context
import { NodeProvider } from "../context";

function App() {
  return (
    <NodeProvider>
      <div className="container">
        <Header />
        <Content />
      </div>
    </NodeProvider>
  );
}

export default App;
