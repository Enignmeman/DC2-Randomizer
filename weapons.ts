import { WeaponData } from "./classes.ts"

import { rngSeed } from "./rng.ts"

const seed = new rngSeed()

function randomValue(maximum:number):number{
	let tempValue = seed.xorshiftRandom()%(maximum)
	if (0 > tempValue) tempValue*=-1 
	return tempValue
}


function wepdatToData(wepdat:string):WeaponData[]{
	const weaponStats:WeaponData[] = []
	for (let eachWeapon = 1; eachWeapon <= 112; eachWeapon++) {
		weaponStats.push(new WeaponData(wepdat.split(";\nWEP ")[eachWeapon]))
	}
	return weaponStats
}

function dataToWepdat(weaponStats:WeaponData[]):string{
	let wepdat:string="WEPNUM 112"
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		wepdat += weaponStats[eachWeapon].allToFormattedString()
	}
	return wepdat
}
// version 1 - randomizes attack, durability and elemental stats only
// ADE stands for Attack, Durability and Elements
function ADERando(weaponStats:WeaponData[]):void{
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		const minStats:number[] = []
		const maxStats:number[] = []
		for (let i = 0; i < 10; i++){
			const a = randomValue(1000)%400
			const b = randomValue(1000)%600
			if (a > b) {
				minStats.push(b)
				maxStats.push(a)
			}
			else {
			minStats.push(a)
			maxStats.push(b)
			}
		}
		weaponStats[eachWeapon].wep_st.valUpdate([minStats[0],minStats[1]]);
		weaponStats[eachWeapon].wep_st_l.valUpdate([maxStats[0],maxStats[1]]);
		weaponStats[eachWeapon].wep_st2.valUpdate([minStats[2],minStats[3],minStats[4],minStats[5],minStats[6],minStats[7],minStats[8],minStats[9]]);
		weaponStats[eachWeapon].wep_st2_l.valUpdate([maxStats[2],maxStats[3],maxStats[4],maxStats[5],maxStats[6],maxStats[7],maxStats[8],maxStats[9]]);

	}
}
// version 2 - randomizes melee weapon swing, gunshot type and ABS amount to lvl up only
// ABS amount to lvl up and the unknown value will not be modified, for now
// WSSA stands for Weapon Swing, Shot and ABS
function WSSARando(weaponState:WeaponData[]):void{
	const swing = [0,1,2,3]
	const shot = [0,10,20,30]
	const tempABSValues = [32,512] //minimum & maximum (I do not understand properly the logic of ABS amount needed for weapon lvl up, this might break something)
	const unknownValue = [36,100] //minimum & maximum (this value being unknown, I do not know yet what effects this could have)
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		weaponState[eachWeapon].wep.valUpdate([randomValue(100)+1,randomValue(512)+1])
		weaponState[eachWeapon].wep_spe.gunMeleeUpdate([shot[randomValue(4)],swing[randomValue(4)]])
	}
	
}
// version 3 - randomizes build up options and defeated monster requirements to build up the weapon
// BUMK stands for Build Up and Monster Kills
function BUMKRando(weaponUpgrade:WeaponData[],macho:boolean):void{
	macho = false	//current functions are incompatible with macho sword and can only handle 112 weapons
	const weaponIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,302,303,387]
	const validMonsterIDs = [] //valid monster IDs are currently unknown, will require in-game testing
	if (macho) weaponIDs.push(53)	//if macho=true, add macho sword item id to the valid weapons available
	let tmp:number
	const BUMK:number[] = []
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		tmp=1	//how much weapons this weapon will build up to
		for (let w = 0; w < 2; w++) {	// 1/4 chances of having more than 1 weapon build up options, rolled 2 times
			if (seed.xorshiftRandom()%4==1) tmp++
		}
		for (let w = 0; w < 3; w++) {	//add a weapon id to the BUMK array
			if (tmp>0) {
				BUMK.push(weaponIDs[seed.xorshiftRandom()%weaponIDs.length])
				tmp--
			}
			else BUMK.push(0)
		}
		tmp=0	//how much monster requirements will be necessary
		for (let w = 0; w < 3; w++) {	// 1/8 chances of having a monster requirement for weapon build up, rolled 3 times
			if (seed.xorshiftRandom()%8==1) tmp++
		}
		for (let w = 0; w < 3; w++) {	//add a valid monster id to the BUMK array
			if (tmp>0) {
				BUMK.push(validMonsterIDs[seed.xorshiftRandom()%validMonsterIDs.length])
				tmp--
			}
			else BUMK.push(-1)
		}
		weaponUpgrade[eachWeapon].wep_build.valUpdate(BUMK)
	}
}
//creates a spoilers string
function weaponSpoilersString(weaponStats:WeaponData,weaponNames:string, itemData?:string/*placeholder*/){}

//functions exported for testing purposes
export { ADERando, wepdatToData }