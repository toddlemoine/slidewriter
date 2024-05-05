import React, { Component } from "react";
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";
import classnames from "classnames";
import "./DropdownMenu.css";

class DropdownMenu extends Component {
  render() {
    const {
      trigger,
      onSelect,
      disabled,
      items,
      alignment = "right",
      triggerClassName
    } = this.props;
    const menuClasses = classnames("menu", alignment);
    const triggerClasses = classnames("trigger", triggerClassName);
    return (
      <Wrapper className="dropdown-menu" onSelection={onSelect}>
        <Button disabled={disabled} className={triggerClasses}>
          {trigger}
        </Button>
        <Menu>
          <ul className={menuClasses}>
            {items.map(item => (
              <li key={item.value}>
                <MenuItem {...item}>{item.text}</MenuItem>
              </li>
            ))}
          </ul>
        </Menu>
      </Wrapper>
    );
  }
}

export default DropdownMenu;
