import Block from '../Block';


/**
 * IBlockObject interface, to type hint objects whose values will only be Block
 * objects
 */
interface IBlockObject
{
    [name: string]: Block;
}


export default IBlockObject;