/**
 * Jonathan Balls Ticker Technical Test
 * 31 August 2020
 * 
 * This module contains a Robot interface which represents a generic robot. The
 * three models of robot (Mk1, Mk2, Mk3) are implementations of this interface.
 * A helper function `RobotControlInterface` is also provided to create robots
 * and execute instructions. Examples of usage can be found in test.ts
 * 
 * Assumptions:
 *  - RobotMK2 must not fall of the side of a wall. It is assumed that it may
 *    also not fall off the bottom/go underground.
 *  - Valid instruction strings will be given
 *  - RobotMk2 can still move backwards if it is told to even though the spec
 *    stated that it shouldn't be given those commands.
 *  - Boosts will only be up to 5. Successive boosts won't overheat - only the
 *    same boost.
 *  - Attempting to boost without fuel will not move the robot
 */

interface Robot {
    x: number;
    y: number;
    executeInstructions: { (s: string) : void };
}

/**
 * RobotMk1 is the first `Robot` to be developed by Arachnid Robotics. It
 * accepts instruction strings made up of the letters 'F', 'B', 'L', 'R' which
 * move the robot a single coordinate point to the front, back, left or right
 * respectively.
 */
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
                case 'F': this.y++; break;
                case 'B': this.y--; break;
                case 'L': this.x--; break;
                case 'R': this.x++; break;
                default: console.error("Bad instruction: ", c)
            }
        }
    }
}


export enum Orientation { F, B, L, R }
/**
 * RobotMk2 is the second generation robot from Arachnid Robotics. It accepts
 * the same instruction set as RobotMk1 but responds slightly differently. 'L'
 * and 'R' commands rotate the robot left and right respectively. Moving forward
 * and backwards will move the robot depending on the current orientation of the
 * robot. The default orientation is forward.
 * 
 * The robot is also not allowed to enter negative space. Commands to enter
 * negative space (negative x or y coordinates) will be ignored.
 */
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
                const delta = (c == 'F' ? 1 : -1);
                switch(this.orientation) {
                    case Orientation.F: this.y += delta; break;
                    case Orientation.R: this.x += delta; break;
                    case Orientation.B: this.y -= delta; break;
                    case Orientation.L: this.x -= delta; break;
                }

                if (this.x < 0) this.x = 0;
                if (this.y < 0) this.y = 0;
            }
        }
    }
}

/**
 * RobotMk3 is the third robot created by Arachnid Robotics. It works similarly
 * to RobotMk2 but has some slight differences. The main difference is its new
 * 'boost' functionality. Boost functionality allows the boost itself forward
 * multiple points in a single instruction. The boost is activated by preceding
 * the 'F' with a positive integer between 1 and 5. The robot has only 30 fuel
 * units and won't be able to boost after that.
 */
export class RobotMk3 implements Robot {
    x: number;
    y: number;
    orientation: Orientation;
    fuelUnits: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
        this.fuelUnits = 30;
        this.orientation = Orientation.F;
    }

    executeInstructions(s: string) : void {
        let isBoosting = false;
        let currentBoost = 0;
        for (const c of s) {
            if (!isNaN(parseInt(c))) { // Is it a number?
                isBoosting = true;
                currentBoost = parseInt(c);
                if (currentBoost > 5) currentBoost = 5; // Don't want to overheat :)
                if (currentBoost > this.fuelUnits) currentBoost = this.fuelUnits;
                this.fuelUnits -= currentBoost;
            }
            else if (c == 'L') {
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
                const delta = (c == 'F' ? (isBoosting ? currentBoost : 1): -1);
                switch(this.orientation) {
                    case Orientation.F: this.y += delta; break;
                    case Orientation.R: this.x += delta; break;
                    case Orientation.B: this.y -= delta; break;
                    case Orientation.L: this.x -= delta; break;
                }
                currentBoost = 1;
            }
        }
    }
}


/**
 * Helper function that creates a `Robot` and executes instructions on it.
 * @param robot An implementation of the Robot interface
 * @param x The initial x-coordinate of the `Robot`
 * @param y The initial y-coordinate of the `Robot`
 * @param instructions A string representation of instructions to be sent to the
 *                     new `Robot`
 */
export function RobotControlInterface(robot: { new(x: number, y: number): Robot; }, x: number, y: number, instructions: string) {
    let r = new robot(x, y);
    r.executeInstructions(instructions);
    return { x: r.x, y: r.y };
}
