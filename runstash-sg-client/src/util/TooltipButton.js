import React from "react";

// Material Ui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const TooltipButton = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
}) => (
  <Tooltip title={tip} className={tipClassName} placement='top'>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default TooltipButton;
