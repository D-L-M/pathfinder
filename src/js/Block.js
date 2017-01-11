import Grid from './Grid';


export default class Block
{


    /**
     * Instantiate a Block object with a set x and y position
     * @param {Grid}    grid      Grid object
     * @param {int}     x         X coordinate
     * @param {int}     y         Y coordinate
     * @param {boolean} isBlocked Whether the coordinates are considered 'blocked'
     * @throws {Error} if grid is not a Grid object
     */
    constructor(grid, x = 1, y = 1, isBlocked = false)
    {

        if (!(grid instanceof Grid))
        {
            throw new Error('Grid object not provided');
        }

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
     * @param  {boolean} includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @param  {boolean} allowDiagonals Whether to allow blocks that are diagonally adjacent
     * @return {array}                  Array of Block objects
     */
    getAdjacentBlocks(includeBlocked = true, allowDiagonals = true)
    {

        return this.grid.getAdjacentBlocks(this, includeBlocked, allowDiagonals);

    }


}