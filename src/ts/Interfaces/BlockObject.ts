import Block from '../Block';


/**
 * BlockObject interface, to type hint objects whose values will only be Block
 * objects
 */
interface BlockObject
{
    [name: string]: Block;
}


export default BlockObject;