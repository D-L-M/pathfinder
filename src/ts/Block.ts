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
    public constructor(private grid: Grid, public x: number = 1, public y: number = 1, public isBlocked: boolean = false)
    {

        if (!(grid instanceof Grid))
        {
            throw new Error('Grid object not provided');
        }

    }


    /**
     * Get the block's coordinates as a string ('x,y')
     * @return {string} Coordinates of the block
     */
    public getCoordinates(): string
    {

        return this.x + ',' + this.y;

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {boolean} includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @param  {boolean} allowDiagonals Whether to allow blocks that are diagonally adjacent
     * @return {array}                  Array of Block objects
     */
    public getAdjacentBlocks(includeBlocked: boolean = true, allowDiagonals: boolean = true): Block[]
    {

        return this.grid.getAdjacentBlocks(this, includeBlocked, allowDiagonals);

    }


}