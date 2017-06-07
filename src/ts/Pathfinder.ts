import Block from './Block';
import Grid from './Grid';
import NavigationPath from './NavigationPath';
import NavigationPathOptions from './Interfaces/NavigationPathOptions';


class Pathfinder
{


    private grid: Grid;


    /**
     * Instantiate a Pathfinder object and bootstrap all dependencies
     * @param {int}     width                  Width of grid
     * @param {int}     height                 Height of grid
     * @param {array}   blocked                Array of blocked coordinates
     * @param {boolean} blockedListIsClearList Whether to turn blocked into a list of unblocked coordinates
     */
    constructor(width: number = 10, height: number = 10, blocked: string[] = [], blockedListIsClearList: boolean = false)
    {

        this.grid = new Grid(width, height, blocked, blockedListIsClearList);

    }


    /**
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws {Error} if a block does not exist at the given coordinates
     */
    getBlockAtCoordinates(x: number = 1, y: number = 1): Block
    {

        return this.grid.getBlockAtCoordinates(x, y);

    }


    /**
     * Get a nagivation path
     * @param  {Block}          from     Start block object
     * @param  {Block}          to       Finish block object
     * @param  {object}         options  Optional options object
     * @return {NavigationPath}          NavigationPath object
     * @throws {Error} if from and to are not both Block objects
     * @throws {Error} if it is not possible to plot a path
     */
    getNavigationPath(from: Block, to: Block, options: NavigationPathOptions = {allowDiagonals: true}): NavigationPath
    {

        if (!(from instanceof Block) || !(to instanceof Block))
        {
            throw new Error('Two Block objects not provided');
        }

        return new NavigationPath(this.grid, from, to, options);

    }


}


export = Pathfinder;