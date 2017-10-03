import { Grid } from './Grid';
import { Block } from './Block';
import { INavigationPathOptions } from './Interface/INavigationPathOptions';
import { IBlockObject } from './Interface/IBlockObject';


/**
 * NavigationPath class
 */
export class NavigationPath
{


    /**
     * Array of Block objects that make up the path
     * @property {array} path
     */
    public path: Block[] = [];


    /**
     * Array of Block objects that have been explored
     * @property {array} explored
     */
    public explored: Block[] = [];


    /**
     * Instantiate a NavigationPath object and plot the requested path
     * @param {Grid}   _grid    Grid object
     * @param {Block}  _from    Start block object
     * @param {Block}  _to      Finish block object
     * @param {object} _options Optional options object
     */
    public constructor(protected _grid: Grid, protected _from: Block, protected _to: Block, protected _options: INavigationPathOptions = {allowDiagonals: true})
    {

        this._calculatePath();

    }


    /**
     * Get the grid which the path traverses
     * @return {Grid} Grid object that the path traverses
     */
    public getGrid(): Grid
    {

        return this._grid;

    }


    /**
     * Get the starting block
     * @return {Block} Starting block
     */
    public getStartPoint(): Block
    {

        return this._from;

    }


    /**
     * Get the end block
     * @return {Block} End block
     */
    public getEndPoint(): Block
    {

        return this._to;

    }


    /**
     * Get the path options
     * @return {INavigationPathOptions} INavigationPathOptions object
     */
    public getOptions(): INavigationPathOptions
    {

        return this._options;

    }


    /**
     * Reorder an array of blocks so that the nearest blocks to the finish
     * block are at the top
     * @param  {array} blocks       Array of Block objects
     * @param  {array} ignoreBlocks Array of Block objects to ignore
     * @return {array}              Ordered array of Block objects
     */
    protected _reorderBlocks(blocks: Block[] = [], ignoreBlocks: Block[] = []): Block[]
    {

        let result: Block[]        = [];
        let ordered: Block[]       = [];
        let toIgnore: IBlockObject = {};

        /*
         * Reconstruct the 'ignore' object with the blocks' coordinates as keys
         */
        for (let i in ignoreBlocks)
        {

            if (ignoreBlocks.hasOwnProperty(i))
            {
                let blockToIgnore: Block        = ignoreBlocks[i];
                let coordinatesToIgnore: string = blockToIgnore.getCoordinates();
                toIgnore[coordinatesToIgnore]   = blockToIgnore;
            }

        }

        /*
         * Add each block into a new array, using its rounded distance as its
         * key
         */
        for (let j in blocks)
        {

            if (blocks.hasOwnProperty(j))
            {

                let block: Block        = blocks[j];
                let coordinates: string = block.getCoordinates();

                if (typeof(toIgnore[coordinates]) === 'undefined')
                {
                    let index: number = this._deriveKeyFromDistance(block);
                    ordered[index]    = block;
                }

            }

        }

        /*
         * Create a final version of the above, using incremental keys instead
         */
        for (let k in ordered)
        {
            if (ordered.hasOwnProperty(k))
            {
                result.push(ordered[k]);
            }
        }

        return result;

    }


    /**
     * Generate a key suitable for use in an array based on a block's distance
     * from the destination block
     * @param  {Block} block Block object to calculate key for
     * @return {int}         Numeric index key
     */
    protected _deriveKeyFromDistance(block: Block): number
    {

        let distance: number = this._grid.calculateDistanceBetweenBlocks(block, this._to);
        let degrees: number  = this._grid.calculateDegreesBetweenBlocks(block, this._to);

        return parseInt(Math.round(distance * 10).toString() + ('000' + Math.round(degrees).toString()).slice(-3));

    }


    /**
     * Calculate the quickest path between the start and end points
     * @throws {Error} if it is not possible to plot a path
     */
    protected _calculatePath(): void
    {

        this.path     = [];
        this.explored = [];

        let from: Block                   = this._from;
        let to: Block                     = this._to;
        let pathHeads: Block[]            = [];
        let visitedBlocks: IBlockObject   = {};
        let pathHeadHistory: IBlockObject = {};

        /*
         * If the end point is blocked, throw an immediate exception
         */
        if (to.isBlocked)
        {
            throw new Error('Cannot calculate path — end point is blocked');
        }

        /*
         * Set up an initial path head (a head is the latest block used in a
         * given path) to be the starting block
         */
        let index: number = this._deriveKeyFromDistance(from);
        pathHeads[index]  = from;

        /*
         * this.path will eventually be populated with blocks that form a
         * 'winning' path, so for as long as it is empty, the search continues
         */
        while (this.path.length == 0)
        {

            let foundFreeBlock: boolean = false;

            /*
             * Iterate through all path heads and work on those that haven't
             * yet been nullified (will be the latest generation of heads)
             */
            for (let i in pathHeads)
            {

                if (pathHeads.hasOwnProperty(i))
                {

                    let block: Block = pathHeads[i];

                    /*
                     * If the block has been visited already then skip to the
                     * next path head
                     */
                    if (typeof(visitedBlocks[block.getCoordinates()]) !== 'undefined')
                    {
                        continue;
                    }

                    /*
                     * Get adjacent blocks to the head and loop through them
                     */
                    foundFreeBlock                  = true;
                    let allowDiagonals: boolean     = this._options.allowDiagonals;
                    let visitedBlocksArray: Block[] = Object.keys(visitedBlocks).map(key => visitedBlocks[key]);
                    let adjacentBlocks: Block[]     = this._reorderBlocks(block.getAdjacentBlocks(false, allowDiagonals), visitedBlocksArray);
                    let headCoordinates: string     = block.getCoordinates();

                    for (let j in adjacentBlocks)
                    {

                        if (adjacentBlocks.hasOwnProperty(j))
                        {

                            let adjacentBlock: Block             = adjacentBlocks[j];
                            let adjacentBlockCoordinates: string = adjacentBlock.getCoordinates();

                            /*
                             * Add each adjacent block as a path head and add
                             * the current head to the path head history, tagged
                             * with the coordinates of the adjacent block (this
                             * way, blocks thatcomprise a successful path can be
                             * retraced)
                             */
                            pathHeadHistory[adjacentBlockCoordinates] = block;

                            let index: number = this._deriveKeyFromDistance(adjacentBlock);
                            pathHeads[index]  = adjacentBlock;

                            if (this.explored.indexOf(adjacentBlock) === -1)
                            {
                                this.explored.push(adjacentBlock);
                            }

                            /*
                             * If the adjacent block is the ending block, look up the
                             * blocks that comprised the path and add them to this.path
                             */
                            if (adjacentBlock.x == to.x && adjacentBlock.y == to.y)
                            {

                                let previousPathHead: Block = adjacentBlock;

                                while (typeof(previousPathHead) !== 'undefined')
                                {

                                    this.path.unshift(previousPathHead);

                                    previousPathHead = pathHeadHistory[previousPathHead.getCoordinates()];

                                }

                                return;

                            }

                        }

                    }

                    /*
                     * Once a block has been dealt with, nullify it so that it
                     * is no longer a path head and other heads know that they
                     * were too slow and should not consider this block
                     */
                    visitedBlocks[headCoordinates] = block;

                    pathHeads.splice(parseInt(i), 1);

                    /*
                     * Break out of the loop, so that the most direct path will
                     * always be explored first
                     */
                    break;

                }

            }

            /*
             * If no adjacent blocks were found for any of the path heads,
             * throw an exception
             */
            if (!foundFreeBlock)
            {
                throw new Error('No path exists between the requested start and end point');
            }

        }

    }


}
