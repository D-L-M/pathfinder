class Grid
{


    /**
     * Instantiate a Grid object with a set width and height
     * @param {int}   width   Width of grid
     * @param {int}   height  Height of grid
     * @param {array} blocked Array of blocked coordinates
     */
    constructor(width = 10, height = 10, blocked = [])
    {

        this.width  = width;
        this.height = height;
        this.blocks = [];

        for (let x = 1; x <= width; x++)
        {

            this.blocks[x] = [];

            for (let y = 1; y <= height; y++)
            {
                let isBlocked     = (blocked.indexOf(x + ',' + y) > -1);
                this.blocks[x][y] = new Block(x, y, isBlocked);
            }

        }

    }


}