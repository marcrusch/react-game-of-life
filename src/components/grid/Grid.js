import { useEffect, useState } from 'react';
import './Grid.css';
import Cell from "../cell/Cell";

function Grid(props) {
    const [running, setRunning] = useState();
    const changeState = (x ,y, newValue) => {
        const gridClone = JSON.parse(JSON.stringify(grid));
        gridClone[y].children[x].active = newValue;
        setGrid(gridClone);
    }

    const generateGrid = (width, height) => {
        const grid = [];
        let cellKey = 0;
        let rowKey = 0;
        let y = 0;
        for(let i = 0; i < height; i++) {
            const row = {key: rowKey, children: []};
            let x = 0;
            for(let ii=0; ii<width; ii++) {
                row.children.push({active: false, x: x, y: y, key: `cell_${cellKey}`});
                cellKey++;
                x++;
            }
            grid.push(row);
            rowKey++;
            y++;
        }
        return grid;
    }
    const [grid, setGrid] = useState(generateGrid(50, 30));

    const resetGrid = () => {
        window.location.reload();
    }

    const [count, setCount] = useState(0);

    const [intervalVar, setIntervalVar] = useState();

    function start() {
        let countTemp = 0;
        setIntervalVar(setInterval(() => {
            setGrid(oldgrid => generateNextGrid(oldgrid));
            countTemp++;
            setCount(countTemp)
        }, 200))
    }

    function stop() {
        setRunning(false);
        clearInterval(intervalVar);
    }


  return (
    <div className="ui">
        <div className="grid-container">
            <div className="grid">
                {grid.map(row => {
                const newRow = [];
                row.children.forEach((cell) => {
                    newRow.push(<Cell x={cell.x} y={cell.y} active={cell.active} key={`${cell.key}${cell.active?"--active":""}`} changeState={changeState}/>);
                });
                return <div className="grid__row" key={`row_${row.key}`}>{newRow}</div>
            })}
            </div>
        </div>
        <div className="controls-container">
            <div className="controls">
                <div className="controls__button-container">
                    <div className="controls__start controls__button" onClick={start}>
                        Start
                    </div>
                    <div className="controls__stop controls__button" onClick={stop}>
                        Stop
                    </div>
                    <div className="controls__reset controls__button" onClick={resetGrid}>
                        Reset
                    </div>
                    <div>
                        {count}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

function generateNextGrid(grid) {
    const gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy.forEach((row, rowI) => {
        row.children.forEach((cell, cellI) => {
            const neighbourCount = getNeighbourCount(grid, cellI, rowI)
            if(!cell.active) {
                if(neighbourCount == 3) {
                    cell.active = true;
                }
            } else {
                if(neighbourCount <= 1 || neighbourCount >= 4) {
                    cell.active = false;
                }
            }
        })
    })
    return gridCopy;
}

function getNeighbourCount(grid, x, y) {
    let count = 0;
    // top left
    if(grid[y-1]) {
        if(grid[y-1].children[x-1]) {
            if(grid[y-1].children[x-1].active) {
                count++;
            }
        }
        // top center
        if(grid[y-1].children[x]) {
            if(grid[y-1].children[x].active) {
                count++;
            }
        }
        // top right
        if(grid[y-1].children[x+1]) {
            if(grid[y-1].children[x+1].active) {
                count++;
            }
        }
    }

    // mid left
    if(grid[y].children[x-1]) {
        if(grid[y].children[x-1].active) {
            count++;
        }
    }
    // mid right
    if(grid[y].children[x+1]) {
        if(grid[y].children[x+1].active) {
            count++;
        }
    }
    if(grid[y+1]) {
        // bottom left
        if(grid[y+1].children[x-1]) {
            if(grid[y+1].children[x-1].active) {
                count++;
            }
        }
        // bottom center
        if(grid[y+1].children[x]) {
            if(grid[y+1].children[x].active) {
                count++;
            }
        }
        // bottom right
        if(grid[y+1].children[x+1]) {
            if(grid[y+1].children[x+1].active) {
                count++;
            }
        }
    }
    return count;
}


export default Grid;
