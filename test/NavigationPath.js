let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('NavigationPath', function()
{

    describe('constructor()', function()
    {

        it('returns a NavigationPath object, with corresponding properties set', function()
        {

            let width          = 10;
            let height         = 10;
            let pathfinder     = new Pathfinder(width, height);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(10, 10);
            let options        = {allowDiagonals: false};
            let navigationPath = pathfinder.getNavigationPath(from, to, options);

            assert.equal('object', (typeof navigationPath));
            assert.equal('object', (typeof navigationPath.grid));
            assert.equal(width, navigationPath.grid.width);
            assert.equal(height, navigationPath.grid.height);
            assert.equal(to, navigationPath.to);
            assert.equal(from, navigationPath.from);
            assert.equal(options, navigationPath.options);

        });

    });

    describe('_reorderBlocks()', function()
    {

        it('correctly reorders blocks', function()
        {

            let width           = 10;
            let height          = 10;
            let pathfinder      = new Pathfinder(width, height);
            let from            = pathfinder.getBlockAtCoordinates(1, 1);
            let to              = pathfinder.getBlockAtCoordinates(10, 10);
            let navigationPath  = pathfinder.getNavigationPath(from, to);
            let firstBlock      = pathfinder.getBlockAtCoordinates(1, 1);
            let secondBlock     = pathfinder.getBlockAtCoordinates(9, 9);
            let thirdBlock      = pathfinder.getBlockAtCoordinates(9, 7);
            let blocks          = [firstBlock, secondBlock, thirdBlock];
            let reorderedBlocks = navigationPath._reorderBlocks(blocks);

            assert.equal(3, reorderedBlocks.length);
            assert.equal(secondBlock, reorderedBlocks[0]);
            assert.equal(thirdBlock, reorderedBlocks[1]);
            assert.equal(firstBlock, reorderedBlocks[2]);

        });

        it('correctly reorders blocks, ignoring some', function()
        {

            let width           = 10;
            let height          = 10;
            let pathfinder      = new Pathfinder(width, height);
            let from            = pathfinder.getBlockAtCoordinates(1, 1);
            let to              = pathfinder.getBlockAtCoordinates(10, 10);
            let navigationPath  = pathfinder.getNavigationPath(from, to);
            let firstBlock      = pathfinder.getBlockAtCoordinates(1, 1);
            let secondBlock     = pathfinder.getBlockAtCoordinates(9, 9);
            let thirdBlock      = pathfinder.getBlockAtCoordinates(9, 7);
            let blocks          = [firstBlock, secondBlock, thirdBlock];
            let blocksToIgnore  = [secondBlock];
            let reorderedBlocks = navigationPath._reorderBlocks(blocks, blocksToIgnore);

            assert.equal(2, reorderedBlocks.length);
            assert.equal(thirdBlock, reorderedBlocks[0]);
            assert.equal(firstBlock, reorderedBlocks[1]);

        });

    });

    describe('_deriveKeyFromDistance()', function()
    {

        it('correctly calculates a key based on distance from the destination block', function()
        {

            let width          = 10;
            let height         = 10;
            let pathfinder     = new Pathfinder(width, height);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(10, 10);
            let navigationPath = pathfinder.getNavigationPath(from, to);
            let firstBlock     = pathfinder.getBlockAtCoordinates(1, 1);
            let secondBlock    = pathfinder.getBlockAtCoordinates(9, 9);
            let thirdBlock     = pathfinder.getBlockAtCoordinates(9, 7);
            
            assert.equal('127225', navigationPath._deriveKeyFromDistance(firstBlock));
            assert.equal('14225', navigationPath._deriveKeyFromDistance(secondBlock));
            assert.equal('32252', navigationPath._deriveKeyFromDistance(thirdBlock));

        });

    });

    describe('_calculatePath()', function()
    {

        it('can successfully find a basic path', function ()
        {

            let width          = 10;
            let height         = 10;
            let pathfinder     = new Pathfinder(width, height);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(10, 10);
            let navigationPath = pathfinder.getNavigationPath(from, to);
            
            navigationPath._calculatePath();

            assert.equal(10, navigationPath.path.length);
            assert.equal(39, navigationPath.explored.length);

        });

        it('can successfully find a basic path, avoiding diagonals', function ()
        {

            let width          = 10;
            let height         = 10;
            let options        = {allowDiagonals: false};
            let pathfinder     = new Pathfinder(width, height);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(10, 10);
            let navigationPath = pathfinder.getNavigationPath(from, to, options);
            
            navigationPath._calculatePath();

            assert.equal(19, navigationPath.path.length);
            assert.equal(35, navigationPath.explored.length);

        });

        it('returns the expected path blocks', function ()
        {

            let width          = 10;
            let height         = 10;
            let options        = {allowDiagonals: false};
            let pathfinder     = new Pathfinder(width, height);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(2, 3);
            let navigationPath = pathfinder.getNavigationPath(from, to, options);
            
            navigationPath._calculatePath();

            assert.equal(4, navigationPath.path.length);
            assert.equal('1,1', navigationPath.path[0].getCoordinates());
            assert.equal('1,2', navigationPath.path[1].getCoordinates());
            assert.equal('1,3', navigationPath.path[2].getCoordinates());
            assert.equal('2,3', navigationPath.path[3].getCoordinates());

            assert.equal(5, navigationPath.explored.length);
            assert.equal('1,2', navigationPath.explored[0].getCoordinates());
            assert.equal('2,1', navigationPath.explored[1].getCoordinates());
            assert.equal('1,3', navigationPath.explored[2].getCoordinates());
            assert.equal('2,2', navigationPath.explored[3].getCoordinates());
            assert.equal('2,3', navigationPath.explored[4].getCoordinates());

        });

        it('returns the expected path blocks when avoiding obstacles', function ()
        {

            let width          = 10;
            let height         = 10;
            let options        = {allowDiagonals: false};
            let obstacles      = ['1,3'];
            let pathfinder     = new Pathfinder(width, height, obstacles);
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(2, 3);
            let navigationPath = pathfinder.getNavigationPath(from, to, options);
            
            navigationPath._calculatePath();

            assert.equal(4, navigationPath.path.length);
            assert.equal('1,1', navigationPath.path[0].getCoordinates());
            assert.equal('1,2', navigationPath.path[1].getCoordinates());
            assert.equal('2,2', navigationPath.path[2].getCoordinates());
            assert.equal('2,3', navigationPath.path[3].getCoordinates());

            assert.equal(4, navigationPath.explored.length);
            assert.equal('1,2', navigationPath.explored[0].getCoordinates());
            assert.equal('2,1', navigationPath.explored[1].getCoordinates());
            assert.equal('2,2', navigationPath.explored[2].getCoordinates());
            assert.equal('2,3', navigationPath.explored[3].getCoordinates());

        });

        it('throws an Error if a path cannot be mapped', function ()
        {

            let width          = 10;
            let height         = 1;
            let pathfinder     = new Pathfinder(width, height);
            let grid           = pathfinder.grid;
            let from           = pathfinder.getBlockAtCoordinates(1, 1);
            let to             = pathfinder.getBlockAtCoordinates(10, 1);

            assert.throws(function()
            {
                grid.getBlockAtCoordinates(3, 1).isBlocked = true;
                navigationPath._calculatePath();
            }, Error);

        });

    });

});