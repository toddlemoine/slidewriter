import React from "react";
import "./PresentationStage.css";

export default React.forwardRef(({ children }, ref) => {
  return (
    <section ref={ref} className="presentation-stage">
      {children}
    </section>
  );
});
