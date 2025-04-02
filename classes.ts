class WEP_ST2 {
    id:string;  //WEP_ST2 for minimum elemental stats or WEP_ST2_L for max elemental stats
    flame:number;
    chill:number;
    lightning:number;
    cyclone:number;
    smash:number;
    exorcism:number;
    beast:number;
    scale:number;
    constructor(_WEP_ST2:string){    //string should be formatted like this: "WEP_ST2_L 0,0,0,0,0,0,0,0"
        let identifier =_WEP_ST2.split(" ")
        if (identifier[0]=="WEP_ST2"){  //only for WEP_ST2 lines, the input/output is "WEP_ST2 0,0,0,0, 0 ,0,0,0" so separating identifier "WEP_ST2" from the weapon stats can't be done by separating using " "
            this.id = "WEP_ST2"
            identifier =_WEP_ST2.split("WEP_ST2 ")
        }
        else this.id = "WEP_ST2_L"
        const values = identifier[1].split(",")
        this.flame = Number(values[0])
        this.chill = Number(values[1])
        this.lightning = Number(values[2])
        this.cyclone = Number(values[3])
        this.smash = Number(values[4])
        this.exorcism = Number(values[5])
        this.beast = Number(values[6])
        this.scale = Number(values[7])
    }
    valUpdate(newVal:number[]):void{ //array must have 8 elements exactly
        this.flame = newVal[0]
        this.chill = newVal[1]
        this.lightning = newVal[2]
        this.cyclone = newVal[3]
        this.smash = newVal[4]
        this.exorcism = newVal[5]
        this.beast = newVal[6]
        this.scale = newVal[7]
    }
    toFormattedString():string{  //returns the formatted string, according to the identifier
        if (this.id=="WEP_ST2") return `${this.id} ${this.flame},${this.chill},${this.lightning},${this.cyclone}, ${this.smash} ,${this.exorcism},${this.beast},${this.scale};\n`
        else return `${this.id} ${this.flame},${this.chill},${this.lightning},${this.cyclone},${this.smash},${this.exorcism},${this.beast},${this.scale};\n`
    }
}
class WEP_ST {
    id:string;  //WEP_ST for minimum attack/durable stats or WEP_ST_L for max attack/durable stats
    attack:number;
    durable:number;
    constructor(_WEP_ST:string){    //string should be formatted like this: "WEP_ST 0,0"
        const identifier =_WEP_ST.split(" ")
        this.id = identifier[0]
        const values = identifier[1].split(",")
        this.attack = Number(values[0])
        this.durable = Number(values[1])
    }
    valUpdate(newVal:number[]):void{ //array must have 2 elements exactly
        this.attack = newVal[0]
        this.durable = newVal[1]
    }
    toFormattedString():string{  //returns the formatted string
        return `${this.id} ${this.attack},${this.durable};\n`
    }
}
class WEP_SPE {
    id = "WEP_SPE";
    startSynthPoints:number;
    unknown0:number;
    unknown1:number;
    lvlUpSynthPoints:number;
    ability:number;
    gunShot:number;
    meleeSwing:number;
    constructor(_WEP_SPE:string){   //string should be formatted like this: "WEP_SPE 0,0,0,0,0,0,0"
        const values = _WEP_SPE.split(" ")[1].split(",")
        this.startSynthPoints = Number(values[0])
        this.unknown0 = Number(values[1])
        this.unknown1 = Number(values[2])
        this.lvlUpSynthPoints = Number(values[3])
        this.ability = Number(values[4])
        this.gunShot = Number(values[5])
        this.meleeSwing = Number(values[6])
    }
    gunMeleeUpdate(newVal:number[]):void{
        this.gunShot = newVal[0]
        this.meleeSwing = newVal[1]
    }
    allValUpdate(newVal:number[]):void{ //array must have 7 elements exactly
        this.startSynthPoints = newVal[0]
        this.unknown0 = newVal[1]
        this.unknown1 = newVal[2]
        this.lvlUpSynthPoints = newVal[3]
        this.ability = newVal[4]
        this.gunShot = newVal[5]
        this.meleeSwing = newVal[6]
    }
    toFormattedString():string{  //returns the formatted string
        return `${this.id} ${this.startSynthPoints},${this.unknown0},${this.unknown1},${this.lvlUpSynthPoints},${this.ability},${this.gunShot},${this.meleeSwing};\n`
    }
}
class WEP_BUILD {
    id = "WEP_BUILD";
    buildUpWeaponId1:number;
    buildUpWeaponId2:number;
    buildUpWeaponId3:number;
    defeatedMonsterRequirement1:number;
    defeatedMonsterRequirement2:number;
    defeatedMonsterRequirement3:number;
    constructor(_WEP_BUILD:string){   //string should be formatted like this: "WEP_BUILD 0,0,0,0,0,0;"
        const values = _WEP_BUILD.split(" ")[1].split(",")
        this.buildUpWeaponId1 = Number(values[0])
        this.buildUpWeaponId2 = Number(values[1])
        this.buildUpWeaponId3 = Number(values[2])
        this.defeatedMonsterRequirement1 = Number(values[3])
        this.defeatedMonsterRequirement2 = Number(values[4])
        if (isNaN(Number(values[5]))){
            this.defeatedMonsterRequirement3 = Number(values[5].split(";")[0])
        }
        else this.defeatedMonsterRequirement3 = Number(values[5])
    }
    valUpdate(newVal:number[]):void{ //array must have 6 elements exactly
        this.buildUpWeaponId1 = newVal[0]
        this.buildUpWeaponId2 = newVal[1]
        this.buildUpWeaponId3 = newVal[2]
        this.defeatedMonsterRequirement1 = newVal[3]
        this.defeatedMonsterRequirement2 = newVal[4]
        this.defeatedMonsterRequirement3 = newVal[5]
    }
    toFormattedString():string{  //returns the formatted string
        return `${this.id} ${this.buildUpWeaponId1},${this.buildUpWeaponId2},${this.buildUpWeaponId3},${this.defeatedMonsterRequirement1},${this.defeatedMonsterRequirement2},${this.defeatedMonsterRequirement3};`
    }
}
class WEP {
    id = "WEP";
    unknown:number;
    requiredABS:number;
    constructor(_WEP:string){    //string should be formatted like this: "0,0"
        const values =_WEP.split(",")
        this.unknown = Number(values[0])
        this.requiredABS = Number(values[1])
    }
    valUpdate(newVal:number[]):void{ //array must have 2 elements exactly
        this.unknown = newVal[0]
        this.requiredABS = newVal[1]
    }
    toFormattedString():string{  //returns the formatted string
        return `\n${this.id} ${this.unknown},${this.requiredABS};\n`
    }
}

export class WeaponData {
    wep:WEP;
    wep_st:WEP_ST;
    wep_st_l:WEP_ST;
    wep_st2:WEP_ST2;
    wep_st2_l:WEP_ST2;
    wep_spe:WEP_SPE;
    wep_build:WEP_BUILD;
    constructor(_weaponData:string){
        /* _weaponData string should be formatted like this:
        42,64;
        WEP_ST 16,15;
        WEP_ST_L 35,34;
        WEP_ST2 2,0,0,0, 10 ,0,5,0;
        WEP_ST2_L 34,34,34,34,34,34,34,34;
        WEP_SPE 1,5,0,3,0,0,0;
        WEP_BUILD 3,0,0,-1,-1,-1;
        */
        const WEPValues = _weaponData.split(";\n")
        this.wep = new WEP(WEPValues[0]);
        this.wep_st = new WEP_ST(WEPValues[1]);
        this.wep_st_l = new WEP_ST(WEPValues[2]);
        this.wep_st2 = new WEP_ST2(WEPValues[3]);
        this.wep_st2_l = new WEP_ST2(WEPValues[4]);
        this.wep_spe = new WEP_SPE(WEPValues[5]);
        this.wep_build = new WEP_BUILD(WEPValues[6]);
    }
	allValUpdate(newABS:number[],newAtkDur:number[], newElement:number[], newSpecial:number[], newBuildUp:number[]):void{
        const valWep = [newABS[0],newABS[1]]
        const valWepSt = [newAtkDur[0],newAtkDur[2]]
        const valWepStL = [newAtkDur[1],newAtkDur[3]]
        const valWepSt2 = [newElement[0],newElement[2],newElement[4],newElement[6],newElement[8],newElement[10],newElement[12],newElement[14]]
        const valWepSt2L = [newElement[1],newElement[3],newElement[5],newElement[7],newElement[9],newElement[11],newElement[13],newElement[15]]
        const valWepSpe = [newSpecial[0],newSpecial[1],newSpecial[2],newSpecial[3],newSpecial[4],newSpecial[5]]
        const valWepBuild = [newBuildUp[0],newBuildUp[1],newBuildUp[2],newBuildUp[3],newBuildUp[4],newBuildUp[5]]
        this.wep.valUpdate(valWep);
        this.wep_st.valUpdate(valWepSt)
        this.wep_st_l.valUpdate(valWepStL)
        this.wep_st2.valUpdate(valWepSt2)
        this.wep_st2_l.valUpdate(valWepSt2L)
        this.wep_spe.allValUpdate(valWepSpe)
        this.wep_build.valUpdate(valWepBuild)
    }
    allToFormattedString():string{  //returns the formatted string
        return this.wep.toFormattedString()+this.wep_st.toFormattedString()+this.wep_st_l.toFormattedString()+this.wep_st2.toFormattedString()+this.wep_st2_l.toFormattedString()+this.wep_spe.toFormattedString()+this.wep_build.toFormattedString()
    }
}
