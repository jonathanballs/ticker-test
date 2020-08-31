/**
 * Jonathan Balls
 * Ticker technical test
 */

import * as assert from 'assert';
import { RobotControlInterface, RobotMk1, RobotMk2, RobotMk3, Orientation } from './main';

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

/**
 * Part 2 tests
 */
describe('RobotMk2', function() {
    it('should follow instructions correctly', function() {
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'FFFF'), { x: 0, y: 4 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'FFRF'), { x: 1, y: 2 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'LLLF'), { x: 1, y: 0 });
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'RRRBBB'), { x: 3, y: 0 });
    })

    it('should not fall off the wall', function() {
        assert.deepEqual(RobotControlInterface(RobotMk2, 0, 0, 'LF'), { x: 0, y: 0 });
    });
});

/**
 * Part 3 tests
 */
describe('RobotMk3', function() {
    it('should follow instructions correctly', function() {
        assert.deepEqual(RobotControlInterface(RobotMk3, 0, 0, 'FFFF'), { x: 0, y: 4 });
        assert.deepEqual(RobotControlInterface(RobotMk3, 0, 0, '5F'), { x: 0, y: 5 });
        assert.deepEqual(RobotControlInterface(RobotMk3, 0, 0, 'R5F'), { x: 5, y: 0 });
        
        assert.deepEqual(RobotControlInterface(RobotMk3, 0, 0, 'FFFFFF3FLFFFFFFR5FL'), { x: -6, y: 14 });
        assert.deepEqual(RobotControlInterface(RobotMk3, 4, 3, 'FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF'), { x: 36, y: 15 });
    })

    it('should use up fuel', function() {
        let r = new RobotMk3();
        r.executeInstructions('5F');
        assert.equal(r.fuelUnits, 25);
        r.executeInstructions('5F5F5F5F5F');
        assert.equal(r.fuelUnits, 0);
        assert.equal(r.y, 30);

        r.executeInstructions('1F');
        assert.equal(r.y, 30);

        r.executeInstructions('F');
        assert.equal(r.y, 31);
    })
});
