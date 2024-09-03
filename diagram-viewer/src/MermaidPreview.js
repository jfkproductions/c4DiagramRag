import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidPreview = ({ chart }) => {
  const mermaidRef = useRef(null); // Create a ref for the container

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
    // Ensure the chart code is available and the window object is defined (to avoid SSR issues)
    if (chart && typeof window !== "undefined") {
      const element = mermaidRef.current;
      if (element) {
        // Clear previous content
        element.innerHTML = '';
        // Use mermaidAPI to render the chart into the ref element
        mermaid.mermaidAPI.render("mermaidChart", chart, (svgCode) => {
          element.innerHTML = svgCode;
        });
      }
    }
  }, [chart]); // Rerender when the chart prop changes

  return <div ref={mermaidRef} />;
};

export default MermaidPreview;
