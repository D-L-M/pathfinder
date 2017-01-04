class Block
{


    /**
     * Instantiate a Block object with a set x and y position
     * @param {int}  x         X coordinate
     * @param {int}  y         Y coordinate
     * @param {bool} isBlocked Whether the coordinates are considered 'blocked'
     */
    constructor(x = 1, y = 1, isBlocked = false)
    {

        this.x         = x;
        this.y         = y;
        this.isBlocked = isBlocked;

    }


}