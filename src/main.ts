/**
 * Jonathan Balls Ticker Technical Test
 * 31 August 2020
 * 
 * Assumptions:
 *  - RobotMK2 must not fall of the side of a wall. It is assumed that it may
 *    also not fall off the bottom/go underground.
 */

interface Robot {
    x: number;
    y: number;
    executeInstructions: { (s: string) : void };
}

export class RobotMk1 implements Robot {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    executeInstructions(s: string) : void {
        for (const c of s) {
            switch(c) {
                case 'F': this.x++; break;
                case 'B': this.x--; break;
                case 'L': this.y++; break;
                case 'R': this.y--; break;
                default: console.error("Bad instruction: ", c)
            }
        }
    }
}


export enum Orientation { F, B, L, R }
export class RobotMk2 implements Robot {
    x: number;
    y: number;
    orientation: Orientation;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
        this.orientation = Orientation.F;
    }

    executeInstructions(s: string) : void {
        for (const c of s) {
            if (c == 'L') {
                switch(this.orientation) {
                    case Orientation.F: this.orientation = Orientation.L; break;
                    case Orientation.L: this.orientation = Orientation.B; break;
                    case Orientation.B: this.orientation = Orientation.R; break;
                    case Orientation.R: this.orientation = Orientation.F; break;
                }
            }
            else if (c == 'R') {
                switch(this.orientation) {
                    case Orientation.F: this.orientation = Orientation.R; break;
                    case Orientation.R: this.orientation = Orientation.B; break;
                    case Orientation.B: this.orientation = Orientation.L; break;
                    case Orientation.L: this.orientation = Orientation.F; break;
                }
            }
            else if (c == 'F' || c == 'B') {
                const change = (c == 'F' ? 1 : -1);
                switch(this.orientation) {
                    case Orientation.F: this.y += change; break;
                    case Orientation.R: this.x += change; break;
                    case Orientation.B: this.y -= change; break;
                    case Orientation.L: this.x -= change; break;
                }

                if (this.x < 0) this.x = 0;
                if (this.y < 0) this.y = 0;
            }
        }
    }
}


export function RobotControlInterface(robot: { new(...args: any[]): Robot; }, x: number, y: number, instructions: string) {
    let r = new robot(x, y);
    r.executeInstructions(instructions);
    return { x: r.x, y: r.y };
}
