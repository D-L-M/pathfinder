import { assert } from 'chai';
import { Pathfinder } from '../dist/Pathfinder';


describe('NavigationPath', function()
{


    it('is created by Pathfinder, with corresponding properties set', function()
    {

        let width          = 10;
        let height         = 10;
        let pathfinder     = new Pathfinder(width, height);
        let from           = pathfinder.getBlockAtCoordinates(1, 1);
        let to             = pathfinder.getBlockAtCoordinates(10, 10);
        let options        = {allowDiagonals: false};
        let navigationPath = pathfinder.getNavigationPath(from, to, options);

        assert.equal('object', (typeof navigationPath));
        assert.equal('object', (typeof navigationPath.getGrid()));
        assert.equal(width, navigationPath.getGrid().getWidth());
        assert.equal(height, navigationPath.getGrid().getHeight());
        assert.equal(to, navigationPath.getEndPoint());
        assert.equal(from, navigationPath.getStartPoint());
        assert.equal(options, navigationPath.getOptions());

    });


    it('can successfully find a basic path', function ()
    {

        let width          = 10;
        let height         = 10;
        let pathfinder     = new Pathfinder(width, height);
        let from           = pathfinder.getBlockAtCoordinates(1, 1);
        let to             = pathfinder.getBlockAtCoordinates(10, 10);
        let navigationPath = pathfinder.getNavigationPath(from, to);

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
        let grid           = pathfinder.getGrid();
        let from           = pathfinder.getBlockAtCoordinates(1, 1);
        let to             = pathfinder.getBlockAtCoordinates(10, 1);
        let navigationPath = pathfinder.getNavigationPath(from, to);

        assert.throws(() =>
        {
            grid.getBlockAtCoordinates(3, 1).isBlocked = true;
            pathfinder.getNavigationPath(from, to);
        }, Error);

    });


    it('throws an Error if the end point is blocked', function ()
    {

        let width          = 10;
        let height         = 1;
        let pathfinder     = new Pathfinder(width, height);
        let grid           = pathfinder.getGrid();
        let from           = pathfinder.getBlockAtCoordinates(1, 1);
        let to             = pathfinder.getBlockAtCoordinates(10, 1);
        let navigationPath = pathfinder.getNavigationPath(from, to);

        assert.throws(() =>
        {
            grid.getBlockAtCoordinates(10, 1).isBlocked = true;
            pathfinder.getNavigationPath(from, to);
        }, Error);

    });


});
