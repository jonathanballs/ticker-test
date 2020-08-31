/**
 * Jonathan Balls
 * Ticker technical test
 */

import * as assert from 'assert';
import { RobotControlInterface, RobotMk1, RobotMk2, Orientation } from './main';

/**
 * Part 1 tests
 */
describe('RobotMk1', function() {
    it('should follow instructions correctly', function() {
        assert.deepEqual(RobotControlInterface(RobotMk1, 0, 0, 'FBLR'), { x: 0, y: 0 });
        assert.deepEqual(RobotControlInterface(RobotMk1, 0, 0, 'FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF'), { x: 21, y: 1 });
        assert.deepEqual(RobotControlInterface(RobotMk1, 3, 6, 'FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF'), { x: 16, y: 5 });
        assert.deepEqual(RobotControlInterface(RobotMk1, 0, 7, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR'), { x: 8, y: 4 });
    })
});

describe('RobotMk2', function() {
    it('should follow instructions correctly', function() {
        let r = new RobotMk2();
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'FFFF'), { x: 0, y: 4 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'FFRF'), { x: 1, y: 2 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'LLLF'), { x: 1, y: 0 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'RRRBBB'), { x: 3, y: 0 });
    })

    it('should not fall off the wall', function() {
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'LF'), { x: 0, y: 0 });
    });
});
