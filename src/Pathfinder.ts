import { Block } from './Block';
import { Grid } from './Grid';
import { NavigationPath } from './NavigationPath';
import { INavigationPathOptions } from './Interface/INavigationPathOptions';


/**
 * Pathfinder class
 */
export class Pathfinder
{


    /**
     * Grid object on which paths will be found
     * @property {Grid} _grid
     */
    protected _grid: Grid;


    /**
     * Instantiate a Pathfinder object and bootstrap all dependencies
     * @param {int}     width                  Width of grid
     * @param {int}     height                 Height of grid
     * @param {array}   blocked                Array of blocked coordinates
     * @param {boolean} blockedListIsClearList Whether to turn blocked into a list of unblocked coordinates
     */
    public constructor(width: number = 10, height: number = 10, blocked: string[] = [], blockedListIsClearList: boolean = false)
    {

        this._grid = new Grid(width, height, blocked, blockedListIsClearList);

    }


    /**
     * Get the grid
     * @return {Grid} Grid object
     */
    public getGrid(): Grid
    {

        return this._grid;

    }


    /**
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     */
    public getBlockAtCoordinates(x: number = 1, y: number = 1): Block
    {

        return this._grid.getBlockAtCoordinates(x, y);

    }


    /**
     * Get a nagivation path
     * @param  {Block}          from     Start block object
     * @param  {Block}          to       Finish block object
     * @param  {object}         options  Optional options object
     * @return {NavigationPath}          NavigationPath object
     */
    public getNavigationPath(from: Block, to: Block, options: INavigationPathOptions = {allowDiagonals: true}): NavigationPath
    {

        return new NavigationPath(this._grid, from, to, options);

    }


}
