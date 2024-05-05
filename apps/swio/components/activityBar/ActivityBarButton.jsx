import React from "react";
import classnames from "classnames";

const ActivityBarButton = React.forwardRef((props, ref) => {
  const { className, children, primary, ...buttonProps } = props;
  const classes = classnames("activity-bar-button", { primary }, className);
  return (
    <button ref={ref} {...buttonProps} className={classes}>
      <div className="content">{children}</div>
    </button>
  );
});

export default ActivityBarButton;
