import { Block } from './Block';


/**
 * Grid class
 */
export class Grid
{


    /**
     * Multidimensionl array of Block objects
     * @property {array} _blocks
     */
    protected _blocks: Block[][];


    /**
     * Instantiate a Grid object with a set width and height
     * @param {int}     _width                 Width of grid
     * @param {int}     _height                Height of grid
     * @param {array}   blocked                Array of blocked coordinates
     * @param {boolean} blockedListIsClearList Whether to turn blocked into a list of unblocked coordinates
     */
    public constructor(protected _width: number = 10, protected _height: number = 10, blocked: string[] = [], blockedListIsClearList: boolean = false)
    {

        this._blocks = [];

        /*
         * Normalise the blocked list (remove spaces)
         */
        for (let i in blocked)
        {

            if (blocked.hasOwnProperty(i))
            {
                blocked[i] = blocked[i].split(' ').join('');
            }

        }

        /*
         * Create all blocks within the grid
         */
        for (let x: number = 1; x <= _width; x++)
        {

            this._blocks[x] = [];

            for (let y: number = 1; y <= _height; y++)
            {
                let isBlocked: boolean = (blocked.indexOf(x + ',' + y) > -1);
                this._blocks[x][y]      = new Block(this, x, y, (blockedListIsClearList ? !isBlocked : isBlocked));
            }

        }

    }


    /**
     * Get the width of the grid
     * @return {integer} Width of the grid
     */
    public getWidth(): number
    {

        return this._width;

    }


    /**
     * Get the height of the grid
     * @return {integer} Height of the grid
     */
    public getHeight(): number
    {

        return this._height;

    }


    /**
     * Get the blocks that make up the grid
     * @return {array} Multidimensionl array of Block objects
     */
    public getBlocks(): Block[][]
    {

        return this._blocks;

    }


    /**
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws {Error} if a block does not exist at the given coordinates
     */
    public getBlockAtCoordinates(x: number = 1, y: number = 1): Block
    {

        let blocks: Block[][] = this._blocks;

        if (typeof(blocks[x]) !== 'undefined' && typeof(blocks[x][y]) !== 'undefined')
        {
            return blocks[x][y];
        }

        throw new Error('Block at grid coordinate ' + x + ',' + y + ' does not exist');

    }


    /**
     * Calculate the distance between two blocks
     * @param  {Block} firstBlock  First block to check distance between
     * @param  {Block} secondBlock Second block to check distance between
     * @return {float}             Distance between blocks
     */
    public calculateDistanceBetweenBlocks(firstBlock: Block, secondBlock: Block): number
    {

        let xDiff: number    = Math.abs(firstBlock.x - secondBlock.x);
        let yDiff: number    = Math.abs(firstBlock.y - secondBlock.y);
        let distance: number = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

        return distance;

    }


    /**
     * Calculate the degrees between the arc of two blocks
     * @param  {Block} centreBlock   The centre block
     * @param  {Block} outlyingBlock The outlying block that forms the arc limit
     * @return {float}               Degrees between blocks
     */
    public calculateDegreesBetweenBlocks(centreBlock: Block, outlyingBlock: Block): number
    {

        let xDiff: number   = (centreBlock.x - outlyingBlock.x);
        let yDiff: number   = (centreBlock.y - outlyingBlock.y);
        let degrees: number = (Math.atan2(yDiff, xDiff) * (180 / Math.PI));

        if (degrees < 0)
        {
            degrees = (360 + degrees);
        }

        return degrees;

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {Block}   block          Block object to get adjacent blocks to
     * @param  {boolean} includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @param  {boolean} allowDiagonals Whether to allow blocks that are diagonally adjacent
     * @return {array}                  Array of Block objects
     */
    public getAdjacentBlocks(block: Block, includeBlocked: boolean = true, allowDiagonals: boolean = true): Block[]
    {

        let nearby: Block[] = [];

        /*
         * Traverse the rows
         */
        for (let x: number = -1; x <= 1; x++)
        {

            /*
            * Traverse the columns
            */
            for (let y: number = -1; y <= 1; y++)
            {

                let targetX: number        = (block.x + x);
                let targetY: number        = (block.y + y);
                let isCentreBlock: boolean = (x == 0 && y == 0);
                let isOnGrid: boolean      = (targetX > 0 && targetX <= this._width && targetY > 0 && targetY <= this._height);
                let isDiagonal: boolean    = ((x == -1 && y == -1) || (x == -1 && y == 1) || (x == 1 && y == 1) || (x == 1 && y == -1));

                /*
                 * Only include blocks that are actual neighbours and haven't
                 * been marked as 'blocked'
                 */
                if (!isCentreBlock && isOnGrid && (!isDiagonal || allowDiagonals))
                {

                    let targetBlock: Block = this._blocks[targetX][targetY];

                    if (includeBlocked || !targetBlock.isBlocked)
                    {
                        nearby.push(targetBlock);
                    }

                }

            }

        }

        return nearby;

    }


}
