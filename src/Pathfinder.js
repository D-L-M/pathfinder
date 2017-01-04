class Pathfinder
{


    /**
     * Instantiate a Pathfinder object and bootstrap all dependencies
     * @param {int}   width   Width of grid
     * @param {int}   height  Height of grid
     * @param {array} blocked Array of blocked coordinates
     */
    constructor(width = 10, height = 10, blocked = [])
    {

        this.grid = new Grid(width, height, blocked);

    }


    /**
     * Get block at a given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws exception if a block does not exist at the given coordinates
     */
    getBlockAtCoordinate(x = 1, y = 1)
    {

        let grid   = this.grid;
        let blocks = grid.blocks;

        if (typeof(blocks[x]) !== 'undefined' && typeof(blocks[x][y]) !== 'undefined')
        {
            return blocks[x][y];
        }

        throw 'Block at grid coordinate ' + x + ',' + y + ' does not exist';

    }


    /**
     * Get a nagivation path
     * @param  {Block}          from Start block object
     * @param  {Block}          to   Finish block object
     * @return {NavigationPath}      NavigationPath object
     */
    getNavigationPath(from, to)
    {

        return new NavigationPath(this.grid, from, to);

    }


}