import { useState } from 'react';
import './Controls.css';
import Cell from "../cell/Cell";

function Controls(props) {
  return (
    <div className="controls">
        <div className="controls__button-container">
            <div className="controls__start controls__button">
                Start
            </div>
            <div className="controls__stop controls__button">
                Stop
            </div>
            <div className="controls__reset controls__button">
                Reset
            </div>
        </div>
    </div>
  );
}

export default Controls;
