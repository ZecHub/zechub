import { Buffer } from "buffer";

if (typeof globalThis !== "undefined") {
  globalThis.Buffer = Buffer;
}

import _React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
  const originalRemoveChild = Node.prototype.removeChild;

  Node.prototype.removeChild = function(child: any) {
    try {
      let self = this;
      return originalRemoveChild.call(self, child);
    } catch (error: any) {
      if (error.name === 'NotFoundError' || error.message.includes('not a child of this node')) {
        return child; // Ignore the error if the node is already gone
      }
      throw error; // Re-throw other errors
    }
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
