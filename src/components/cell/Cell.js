import { useState } from 'react';
import './Cell.css';

function Cell(props) {
    const [active, setActive] = useState(props.active);
    const colorClass = active? "cell--active" : "";
  return (
    <div className={`cell ${colorClass}`} onClick={() => {
        const newActive = !active;
        props.changeState(props.x, props.y, newActive);
        setActive(newActive);
    }}>
    </div>
  );
}

export default Cell;