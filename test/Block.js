let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('Block', function()
{

    it('is created by Pathfinder, with corresponding properties set', function()
    {

        let width      = 10;
        let height     = 10;
        let x          = 4;
        let y          = 7;
        let pathfinder = new Pathfinder(width, height);
        let block      = pathfinder.getBlockAtCoordinates(x, y);

        assert.equal(x, block.x);
        assert.equal(y, block.y);
        assert.equal(false, block.isBlocked);
        assert.equal(width, block.grid.width);
        assert.equal(height, block.grid.height);

    });

    describe('getCoordinates()', function()
    {

        it('returns correct coordinates', function()
        {

            let width      = 10;
            let height     = 10;
            let x          = 2;
            let y          = 8;
            let pathfinder = new Pathfinder(width, height);
            let block      = pathfinder.getBlockAtCoordinates(x, y);

            assert.equal(x + ',' + y, block.getCoordinates());

        });

    });

    describe('getAdjacentBlocks()', function()
    {

        it('gets all adjacent blocks when all are available', function()
        {

            let width          = 10;
            let height         = 10;
            let x              = 5;
            let y              = 5;
            let pathfinder     = new Pathfinder(width, height);
            let block          = pathfinder.getBlockAtCoordinates(x, y);
            let adjacentBlocks = block.getAdjacentBlocks();

            assert.equal(8, adjacentBlocks.length);
            assert.equal('4,4', adjacentBlocks[0].getCoordinates());
            assert.equal('4,5', adjacentBlocks[1].getCoordinates());
            assert.equal('4,6', adjacentBlocks[2].getCoordinates());
            assert.equal('5,4', adjacentBlocks[3].getCoordinates());
            assert.equal('5,6', adjacentBlocks[4].getCoordinates());
            assert.equal('6,4', adjacentBlocks[5].getCoordinates());
            assert.equal('6,5', adjacentBlocks[6].getCoordinates());
            assert.equal('6,6', adjacentBlocks[7].getCoordinates());

        });

        it('gets all available adjacent blocks when at edge', function()
        {

            let width          = 10;
            let height         = 10;
            let x              = 10;
            let y              = 9;
            let pathfinder     = new Pathfinder(width, height);
            let block          = pathfinder.getBlockAtCoordinates(x, y);
            let adjacentBlocks = block.getAdjacentBlocks();

            assert.equal(5, adjacentBlocks.length);
            assert.equal('9,8', adjacentBlocks[0].getCoordinates());
            assert.equal('9,9', adjacentBlocks[1].getCoordinates());
            assert.equal('9,10', adjacentBlocks[2].getCoordinates());
            assert.equal('10,8', adjacentBlocks[3].getCoordinates());
            assert.equal('10,10', adjacentBlocks[4].getCoordinates());

        });

        it('gets all adjacent blocks except for diagonals', function()
        {

            let width          = 10;
            let height         = 10;
            let x              = 5;
            let y              = 5;
            let pathfinder     = new Pathfinder(width, height);
            let block          = pathfinder.getBlockAtCoordinates(x, y);
            let adjacentBlocks = block.getAdjacentBlocks(true, false);

            assert.equal(4, adjacentBlocks.length);
            assert.equal('4,5', adjacentBlocks[0].getCoordinates());
            assert.equal('5,4', adjacentBlocks[1].getCoordinates());
            assert.equal('5,6', adjacentBlocks[2].getCoordinates());
            assert.equal('6,5', adjacentBlocks[3].getCoordinates());

        });

        it('gets all adjacent blocks, including blocked', function()
        {

            let width          = 10;
            let height         = 10;
            let blocked        = ['4,4', '5,6', '6,5'];
            let x              = 5;
            let y              = 5;
            let pathfinder     = new Pathfinder(width, height, blocked);
            let block          = pathfinder.getBlockAtCoordinates(x, y);
            let adjacentBlocks = block.getAdjacentBlocks(true);

            assert.equal(8, adjacentBlocks.length);
            assert.equal('4,4', adjacentBlocks[0].getCoordinates());
            assert.equal('4,5', adjacentBlocks[1].getCoordinates());
            assert.equal('4,6', adjacentBlocks[2].getCoordinates());
            assert.equal('5,4', adjacentBlocks[3].getCoordinates());
            assert.equal('5,6', adjacentBlocks[4].getCoordinates());
            assert.equal('6,4', adjacentBlocks[5].getCoordinates());
            assert.equal('6,5', adjacentBlocks[6].getCoordinates());
            assert.equal('6,6', adjacentBlocks[7].getCoordinates());

        });

        it('gets all adjacent blocks, excluding blocked', function()
        {

            let width          = 10;
            let height         = 10;
            let blocked        = ['4,4', '5,6', '6,5'];
            let x              = 5;
            let y              = 5;
            let pathfinder     = new Pathfinder(width, height, blocked);
            let block          = pathfinder.getBlockAtCoordinates(x, y);
            let adjacentBlocks = block.getAdjacentBlocks(false);

            assert.equal(5, adjacentBlocks.length);
            assert.equal('4,5', adjacentBlocks[0].getCoordinates());
            assert.equal('4,6', adjacentBlocks[1].getCoordinates());
            assert.equal('5,4', adjacentBlocks[2].getCoordinates());
            assert.equal('6,4', adjacentBlocks[3].getCoordinates());
            assert.equal('6,6', adjacentBlocks[4].getCoordinates());

        });

    });

});