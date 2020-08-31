/**
 * Jonathan Balls
 * Ticker technical test
 */

import * as assert from 'assert';
import { RobotControlInterface } from './main';

/**
 * Part 1 tests
 */
describe('Robot', function() {
    it('should follow instructions correctly', function() {
        assert.deepEqual(RobotControlInterface(0, 0, 'FBLR'), { x: 0, y: 0 });
        assert.deepEqual(RobotControlInterface(0, 0, 'FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF'), { x: 21, y: 1 });
        assert.deepEqual(RobotControlInterface(3, 6, 'FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF'), { x: 16, y: 5 });
        assert.deepEqual(RobotControlInterface(0, 7, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR'), { x: 8, y: 4 });
    })
});
