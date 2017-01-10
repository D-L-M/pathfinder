let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('Pathfinder', function()
{

    describe('constructor()', function()
    {

        it('returns a Pathfinder object, with a corresponding Grid object', function()
        {

            let width      = 12;
            let height     = 43;
            let blocked    = ['1,3', '10,40', '12,28'];
            let pathfinder = new Pathfinder(width, height, blocked);

            assert.equal('object', (typeof pathfinder));
            assert.equal(width, pathfinder.grid.width);
            assert.equal(height, pathfinder.grid.height);

            for (let i in blocked)
            {

                let block     = pathfinder.getBlockAtCoordinates(blocked[i].split(',')[0], blocked[i].split(',')[1]);
                let isBlocked = block.isBlocked;

                assert.equal(true, isBlocked);

            }

        });

        it('can explicitly blacklist blocks', function ()
        {

            let width      = 2;
            let height     = 1;
            let blocked    = ['2,1'];
            let pathfinder = new Pathfinder(width, height, blocked, false);

            let unblockedBlock = pathfinder.getBlockAtCoordinates(1, 1);
            let blockedBlock   = pathfinder.getBlockAtCoordinates(2, 1);

            assert.equal(false, unblockedBlock.isBlocked);
            assert.equal(true, blockedBlock.isBlocked);

        });

        it('can explicitly whitelist blocks', function ()
        {

            let width      = 2;
            let height     = 1;
            let blocked    = ['2,1'];
            let pathfinder = new Pathfinder(width, height, blocked, true);

            let unblockedBlock = pathfinder.getBlockAtCoordinates(2, 1);
            let blockedBlock   = pathfinder.getBlockAtCoordinates(1, 1);

            assert.equal(false, unblockedBlock.isBlocked);
            assert.equal(true, blockedBlock.isBlocked);

        });

    });

    describe('getBlockAtCoordinates()', function()
    {

        it('can retrieve a specific block', function ()
        {

            let width      = 2;
            let height     = 1;
            let blocked    = ['2,1'];
            let pathfinder = new Pathfinder(width, height, blocked);

            let unblockedBlock = pathfinder.getBlockAtCoordinates(1, 1);
            let blockedBlock   = pathfinder.getBlockAtCoordinates(2, 1);

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
                pathfinder.getBlockAtCoordinates(4, 4);
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
            let from       = pathfinder.getBlockAtCoordinates(1, 1);
            let to         = pathfinder.getBlockAtCoordinates(10, 2);
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
            let from       = pathfinder.getBlockAtCoordinates(1, 1);
            let to         = pathfinder.getBlockAtCoordinates(10, 1);

            assert.throws(function()
            {
                pathfinder.getNavigationPath(from, to);
            }, Error);

        });

    });

});