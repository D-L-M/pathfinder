let assert     = require('assert');
let Pathfinder = require('../dist/pathfinder.min.js');


describe('Pathfinder', function()
{

    describe('constructor', function()
    {

        it('should return a Pathfinder object with grid containing constructor arguments set', function()
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

});