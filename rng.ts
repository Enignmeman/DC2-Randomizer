/**
 * Object containing an unsigned 32 bits integer seed and a means to return random values.
 * @method xorshiftRandom() - Returns a pseudorandom value. (returns 0 if seed is 0)
 * @method getSeed() - Returns seed value.
 * @param _seed integer | undefined
 */
export class rngSeed{
  private seedState:number=this.randInt()
  private seedValue:number
  constructor (_seed?:number){    //if no seed is specified, seed is set to a random number
      const bit32 =2**32
      
      if (!isNaN(Number(_seed))) this.seedState=Number(_seed)
	  //makes sure the seed value is a 32 bits integer (doesn't affect output of xorshifrRandom function)
      while (this.seedState<0) this.seedState+=bit32
	  if (this.seedState>=bit32) this.seedState%=bit32
    this.seedState=Math.floor(this.seedState) // no float allowed
    //prevents the seed value from being 0 (commented because not necessary, 0 will be an easter-egg seed)
    //while (this.seedState==0) this.seedState=this.randInt()
    this.seedValue=this.seedState //store the seed to remember it for later
  }
  private randInt():number{
      const randFloat = Math.random()
      return Math.floor(randFloat*(10**(String(randFloat).length-2)))
  }
  /**
   * Typescript equivalent of the 32 bits xorshift example in C from [Wikipedia](https://en.wikipedia.org/wiki/Xorshift)
   * @returns Returns a pseudorandom output, if seed value is 0, returned value will always be 0
   */
  public xorshiftRandom(){
    let x = this.seedState;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return this.seedState = x
  }
  /**
   * @returns Returns seed value
   */
  public getSeed():number{
    return this.seedValue
  }
}