import { WeaponData } from "./classes.ts"

import { xorshiftRandom, rngSeed } from "./rng.ts"

const seed = new rngSeed()

function randomValue(maximum:number):number{
	let tempValue = xorshiftRandom(seed)%(maximum)
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
// WSSA stands for Weapon Swing, Shot and ABS
function WSSARando(weaponState:WeaponData[]):void{
	const swing = [0,1,2,3]
	const shot = [0,10,20,30]
	const tempABSValues = [32,512] //minimum & maximum (I do not understand properly the logic of ABS amount needed for weapon lvl up, this might break something)
	const unknownValue = [36,100] //minimum & maximum (this value being unknown, I do not know yet what effects this could have)
	//copied from ADERando
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		weaponState[eachWeapon].wep.valUpdate([randomValue(100)+1,randomValue(512)+1])
		weaponState[eachWeapon].wep_spe.gunMeleeUpdate([shot[randomValue(4)],swing[randomValue(4)]])
	}
	
}
// BUMK stands for Build Up and Monster Kills
function BUMKRando(weaponUpgrade:WeaponData[]):void{
	const weaponIDsNoMS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,302,303,387]
	const validMonsterIDs = [] //valid monster IDs are currently unknown
}
//creates a spoilers string
function weaponSpoilersString(weaponStats:WeaponData,weaponNames:string, itemData?:string/*placeholder*/){}

//functions exported for testing purposes
export { ADERando, wepdatToData }