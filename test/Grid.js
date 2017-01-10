let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('Grid', function()
{

    it('is created by Pathfinder, with corresponding properties set', function()
    {

        let width      = 10;
        let height     = 10;
        let x          = 4;
        let y          = 7;
        let pathfinder = new Pathfinder(width, height);
        let grid       = pathfinder.grid;
        let block      = grid.blocks[x][y];

        assert.equal(width, grid.width);
        assert.equal(height, grid.height);
        assert.equal(x, block.x);
        assert.equal(y, block.y);
        assert.equal(false, block.isBlocked);
        assert.equal(width, block.grid.width);
        assert.equal(height, block.grid.height);

    });

    describe('getBlockAtCoordinates()', function()
    {

        it('can retrieve a specific block', function()
        {

            let width      = 10;
            let height     = 10;
            let x          = 2;
            let y          = 6;
            let pathfinder = new Pathfinder(width, height);
            let grid       = pathfinder.grid;
            let block      = grid.getBlockAtCoordinates(x, y);

            assert.equal(x, block.x);
            assert.equal(y, block.y);

        });

        it('throws an Error if an invalid block is requested', function ()
        {

            let width      = 2;
            let height     = 1;
            let pathfinder = new Pathfinder(width, height);
            let grid       = pathfinder.grid;

            assert.throws(function()
            {
                grid.getBlockAtCoordinates(4, 4);
            }, Error);

        });

    });

    describe('calculateDistanceBetweenBlocks()', function()
    {

        it('calculates the correct distance between two blocks', function()
        {

            let width       = 10;
            let height      = 10;
            let pathfinder  = new Pathfinder(width, height);
            let grid        = pathfinder.grid;
            let firstBlock  = grid.getBlockAtCoordinates(2, 3);
            let secondBlock = grid.getBlockAtCoordinates(7, 2);
            let thirdBlock  = grid.getBlockAtCoordinates(1, 2);
            let fourthBlock = grid.getBlockAtCoordinates(1, 4);

            assert.equal(5.0990195135927845, grid.calculateDistanceBetweenBlocks(firstBlock, secondBlock));
            assert.equal(2, grid.calculateDistanceBetweenBlocks(thirdBlock, fourthBlock));

        });

    });

    describe('calculateDegreesBetweenBlocks()', function()
    {

        it('calculates the correct number of degrees in the arc between two blocks', function()
        {

            let width       = 10;
            let height      = 10;
            let pathfinder  = new Pathfinder(width, height);
            let grid        = pathfinder.grid;
            let centreBlock = grid.getBlockAtCoordinates(5, 5);
            let firstBlock  = grid.getBlockAtCoordinates(5, 1);
            let secondBlock = grid.getBlockAtCoordinates(1, 5);
            let thirdBlock  = grid.getBlockAtCoordinates(2, 9);

            assert.equal(90, grid.calculateDegreesBetweenBlocks(centreBlock, firstBlock));
            assert.equal(0, grid.calculateDegreesBetweenBlocks(centreBlock, secondBlock));
            assert.equal(306.86989764584405, grid.calculateDegreesBetweenBlocks(centreBlock, thirdBlock));

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
            let grid           = pathfinder.grid;
            let block          = grid.getBlockAtCoordinates(x, y);
            let adjacentBlocks = grid.getAdjacentBlocks(block);

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
            let grid           = pathfinder.grid;
            let block          = grid.getBlockAtCoordinates(x, y);
            let adjacentBlocks = grid.getAdjacentBlocks(block);

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
            let grid           = pathfinder.grid;
            let block          = grid.getBlockAtCoordinates(x, y);
            let adjacentBlocks = grid.getAdjacentBlocks(block, true, false);

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
            let grid           = pathfinder.grid;
            let block          = grid.getBlockAtCoordinates(x, y);
            let adjacentBlocks = grid.getAdjacentBlocks(block, true);

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
            let grid           = pathfinder.grid;
            let block          = grid.getBlockAtCoordinates(x, y);
            let adjacentBlocks = grid.getAdjacentBlocks(block, false);

            assert.equal(5, adjacentBlocks.length);
            assert.equal('4,5', adjacentBlocks[0].getCoordinates());
            assert.equal('4,6', adjacentBlocks[1].getCoordinates());
            assert.equal('5,4', adjacentBlocks[2].getCoordinates());
            assert.equal('6,4', adjacentBlocks[3].getCoordinates());
            assert.equal('6,6', adjacentBlocks[4].getCoordinates());

        });

    });

});