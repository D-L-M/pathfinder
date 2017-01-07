import Grid from './Grid';


export default class Block
{


    /**
     * Instantiate a Block object with a set x and y position
     * @param {Grid} grid      Grid object
     * @param {int}  x         X coordinate
     * @param {int}  y         Y coordinate
     * @param {bool} isBlocked Whether the coordinates are considered 'blocked'
     */
    constructor(grid, x = 1, y = 1, isBlocked = false)
    {

        this.grid      = grid;
        this.x         = x;
        this.y         = y;
        this.isBlocked = isBlocked;

    }


    /**
     * Get the block's coordinates as a string ('x,y')
     * @return {string} Coordinates of the block
     */
    getCoordinates()
    {

        return this.x + ',' + this.y;

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {bool}  includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @return {array}                Array of Block objects
     */
    getAdjacentBlocks(includeBlocked = true)
    {

        return this.grid.getAdjacentBlocks(this, includeBlocked);

    }


}