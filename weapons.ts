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

function weaponRando(weaponStats:WeaponData[]):void{
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		// version 1 - randomizes attack, durability and elemental stats only
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
//functions exported for testing purposes
export { weaponRando, wepdatToData }