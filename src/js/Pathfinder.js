import Grid from './Grid';
import NavigationPath from './NavigationPath';


export default class Pathfinder
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
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws exception if a block does not exist at the given coordinates
     */
    getBlockAtCoordinate(x = 1, y = 1)
    {

        return this.grid.getBlockAtCoordinate(x, y);

    }


    /**
     * Get a nagivation path
     * @param  {Block}          from     Start block object
     * @param  {Block}          to       Finish block object
     * @param  {object}         options  Optional options object
     * @return {NavigationPath}          NavigationPath object
     */
    getNavigationPath(from, to, options = {})
    {

        return new NavigationPath(this.grid, from, to, options);

    }


}