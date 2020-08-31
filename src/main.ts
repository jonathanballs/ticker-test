/**
 * Jonathan Balls Ticker Technical Test
 * 31 August 2020
 */

export class Robot {
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

export function RobotControlInterface(x: number, y: number, instructions: string) {
    let r = new Robot(x, y);
    r.executeInstructions(instructions);
    return { x: r.x, y: r.y };
}
