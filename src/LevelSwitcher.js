import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

function LevelSwitcher(props) {
  const { levels, handleLevelChange } = props;
  const anchorRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {};
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = () => {};
  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setOpen(false);
    props.handleLevelChange(index);
  };
  return (
    <>
      <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
        <Button color="primary" size="small" onClick={handleToggle}>
          Level {selectedIndex + 1}
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal style={{zIndex: '5000'}}>
        {({ TransitionProps, placement }) => {
          return (
            <Grow
              {...TransitionProps}
              style={{
                zIndex: "50000",
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" style={{ zIndex: "5000" }}>
                    {levels.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option + 1}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </>
  );
}

export default LevelSwitcher;
