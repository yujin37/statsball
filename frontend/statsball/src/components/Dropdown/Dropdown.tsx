import React from "react";
import { Link } from "react-router-dom";
import style from "./Dropdown.module.scss";

interface MenuItem {
    label: string;
    to: string;
}

interface DropdownItems {
    items: MenuItem[];
    onSelect?: () => void
}

const Dropdown = ({items, onSelect}: DropdownItems) => {
    return (
        <div className={style.dropdown}>
            <ul>
                {items.map((item) => (
                    <li key={item.to}>
                    <Link to={item.to} onClick={onSelect}>
                        {item.label}
                    </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown;