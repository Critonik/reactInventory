export const itemTypes: IClothesTypes = {
    0: 'trash',
    1: 'water',
    2: 'sandwich',
    3: 'phone',
    4: 'firstAidKit',
    5: 'cigarettes',
    6: 'weed',
    7: 'meth',
    8: 'heroin',
    9: 'tako',
    10: 'radio',
    11: 'lighter',
    12: 'adrenalin',
    13: 'masterKey',
    14: 'anesthesia',
    15: 'painReliever',
    16: 'epinephrine',
    17: 'Оружие',
    18: 'rod',
    19: 'fish',
    20: 'Одежда',
    21: 'map',
    22: 'bonfire',
    23: 'wetsuit',
    24: 'spruce',
    25: 'coupon',
    26: 'tron',
    27: 'neon',
    28: 'santa',
    29: 'bag'
};


export interface IClothesTypes {
    [key: number]: string;
}

export interface IBagsTypes {
    [key: string]: string;
}


export const bags: IBagsTypes = {
    'Парашют': 'Parachute',
    'Рюкзак': 'BagsAndParachutes',
    'Сумка': 'bag'
}

export const clothesTypes: IClothesTypes = {
    1: 'Masks',
    2: 'Hair Styles',
    3: 'Gloves',
    4: 'Legs',
    5: 'BagsAndParachutes',
    6: 'Shoes',
    7: 'Accessories',
    8: 'Undershirts',
    9: 'BodyArmors',
    10: 'Decals',
    11: 'Tops',
    12: 'Hats',
    13: 'Glasses',
    14: 'Ears',
    18: 'Watches',
    19: 'Bracelets',
}

export const pistols = ['Pistol', 'Pistol50', 'Revolver', 'SnsPistol', 'HeavyPistol', 'MachinePistol', 'MarksmanPistol', 'VintagePistol', 'ApPistol', 'StunGun', 'FlareGun', 'CombatPistol', 'CeramicPistol', 'FlareGun', 'GadgetPistol', 'NavyRevolver', 'PistolMk2', 'RevolverMk2', 'UpNAtomizer'];

export const heavyGun = ['Widowmaker', 'UnholyHellbringer', 'MilitaryRifle', 'CombatShotgun', 'AssaultrifleMk2', 'CarbineRifle', 'Mg', 'AdvancedRifle', 'BullpupShotgun', 'GrenadeLauncher', 'Musket', 'Rpg', 'MiniSmg', 'AssaultRifle', 'SpecialCarbine', 'MarksmanRifle', 'AssaultShotgun', 'DoubleBarrelShotgun', 'AssaultSmg', 'SniperRifle', 'FireExtinguisher', 'CombatPdw', 'HeavySniper', 'SweeperShotgun', 'MicroSmg', 'PumpShotgun', 'Smg', 'HeavyShotgun', 'Minigun', 'GrenadeLauncherSmoke', 'Gusenberg', 'CompactRifle', 'HomingLauncher', 'Railgun', 'SawnOffShotgun', 'BullpupRifle', 'Firework', 'CombatMg', 'CompactGrenadeLauncher'];

export const melee = ['Knife', 'Bat', 'PoolCue', 'Crowbar', 'Flashlight', 'Dagger', 'Unarmed', 'BattleAxe', 'KnuckleDuster', 'Machete', 'SwitchBlade', 'StoneHatchet', 'Hatchet', 'Bottle', 'Wrench', 'GolfClub', 'Hammer', 'Nightstick', 'PetrolCan', 'HazardousJerryCan'];

export const throwingWeapon = ['Grenade', 'BzGas', 'ProximityMine', 'PipeBomb', 'SmokeGrenade', 'Snowball', 'Ball', 'Molotov', 'StickyBomb', 'Flare'];

export const sundry = ['Parachute'];
