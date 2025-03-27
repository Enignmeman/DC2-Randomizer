import { WeaponData } from "./classes.ts"

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

function weaponRando(weaponStats:WeaponData[]):WeaponData[]{
	for (let eachWeapon = 0; eachWeapon < 112; eachWeapon++) {
		//randomizer code
	}
	return weaponStats
}

export { wepdatToData, dataToWepdat }