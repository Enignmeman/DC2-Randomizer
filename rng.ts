/**
 * An object to use along the xorShiftRandom function.
 * @param _seed integer | nothing
 */
export class rngSeed{
  value:number=this.randInt()
  constructor (_seed?:number){    //if no seed is specified, seed is set to a random number
      if (!isNaN(Number(_seed))) this.value=Number(_seed)
  }
  randInt():number{
      const randFloat = Math.random()
      return Math.floor(randFloat*(10**(String(randFloat).length-2)))
  }
}
/**
 *Typescript equivalent of the 32 bits xorshift example in C from [Wikipedia](https://en.wikipedia.org/wiki/Xorshift)
 */
export function xorshiftRandom(seed:rngSeed){
  let x = seed.value;
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  return seed.value = x
}