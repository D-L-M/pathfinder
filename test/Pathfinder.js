let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('Pathfinder', function()
{

    describe('constructor()', function()
    {

        it('returns a Pathfinder object with grid containing constructor arguments set', function()
        {

            let width      = 12;
            let height     = 43;
            let blocked    = ['1,3', '10,40', '12,28'];
            let pathfinder = new Pathfinder(width, height, blocked);

            assert.equal('object', (typeof pathfinder));
            assert.equal(width,  pathfinder.grid.width);
            assert.equal(height, pathfinder.grid.height);

            for (let i in blocked)
            {

                let block     = pathfinder.getBlockAtCoordinate(blocked[i].split(',')[0], blocked[i].split(',')[1]);
                let isBlocked = block.isBlocked;

                assert.equal(true, isBlocked);

            }

        });

    });

    describe('getBlockAtCoordinate()', function()
    {

        it('can retrieve a specific block', function ()
        {

            let width      = 2;
            let height     = 1;
            let blocked    = ['2,1'];
            let pathfinder = new Pathfinder(width, height, blocked);

            let unblockedBlock = pathfinder.getBlockAtCoordinate(1, 1);
            let blockedBlock   = pathfinder.getBlockAtCoordinate(2, 1);

            assert.equal(false, unblockedBlock.isBlocked);
            assert.equal(true, blockedBlock.isBlocked);

        });

        it('throws an Error if an invalid block is requested', function ()
        {

            let width      = 2;
            let height     = 1;
            let pathfinder = new Pathfinder(width, height);

            assert.throws(function()
            {
                pathfinder.getBlockAtCoordinate(4, 4);
            }, Error);

        });

    });

    describe('getNavigationPath()', function()
    {

        it('can successfully find a basic path', function ()
        {

            let width      = 10;
            let height     = 2;
            let pathfinder = new Pathfinder(width, height);
            let from       = pathfinder.getBlockAtCoordinate(1, 1);
            let to         = pathfinder.getBlockAtCoordinate(10, 2);
            let path       = pathfinder.getNavigationPath(from, to);

            assert.equal(10, path.path.length);
            assert.equal(18, path.explored.length);

        });

        it('throws an Error if a path cannot be mapped', function ()
        {

            let width      = 10;
            let height     = 1;
            let blocked    = ['5,1'];
            let pathfinder = new Pathfinder(width, height, blocked);
            let from       = pathfinder.getBlockAtCoordinate(1, 1);
            let to         = pathfinder.getBlockAtCoordinate(10, 1);

            assert.throws(function()
            {
                pathfinder.getNavigationPath(from, to);
            }, Error);

        });

    });

});