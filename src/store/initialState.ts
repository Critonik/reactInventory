import { IStore } from '../interfaces/IStore';


// const dataItem: ICellData[] = [
//     {
//         description: 'sim',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 1,
//         id: 1,
//         state: 1
//     },
//     {
//         description: 'earrings',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 1,
//         id: 2,
//         state: 1
//     },
//     {
//         description: 'hat',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 1,
//         id: 3,
//         state: 1
//     },
//     {
//         description: 'jacket',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 5,
//         id: 4,
//         state: 2
//     },
//     {
//         description: 'mask',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 1,
//         id: 5,
//         state: 1
//     },
//     {
//         description: 'glasses',
//         ownerType: 1,
//         owner: 'owner',
//         item: 4,
//         createdDate: 'today',
//         weight: 1,
//         id: 6,
//         state: 1
//     },
// ];


export const initialState: IStore = {
    body: {
        Bracelets: {
            description: 'Bracelets',
        },
        Ears: {
            description: 'Ears'
        },
        Glasses: {
            description: 'Glasses'
        },
        gloves: {
            description: 'gloves'
        },
        grenade: {
            description: 'grenade'
        },
        gun: {
            description: 'gun'
        },
        Hats: {
            description: 'Hats'
        },
        Tops: {
            description: 'Tops'
        },
        knife: {
            description: 'knife'
        },
        Masks: {
            description: 'Masks'
        },
        Legs: {
            description: 'Legs'
        },
        'Bags and Parachutes': {
            description: 'Bags and Parachutes'
        },
        pistol: {
            description: 'pistol'
        },
        'Body Armors': {
            description: 'Body Armors'
        },
        Shoes: {
            description: 'Shoes'
        },
        Accessories: {
            description: 'Accessories'
        },
        Watches: {
            description: 'Watches'
        }
    },
    environment: {
        down: {
            data: [],
            title: '',
            className: 'down',
        },
        up: {
            data: [],
            title: '',
            className: 'up',
        }
    },
    inventory: {
        inv: {
            data: [],
            title: 'Инвентарь',
            weight: 0,
            cellLimit: 15,
            weightLimit: 10,
        },
        bag: {
            data: [],
            title: 'Рюкзак',
            weight: 0,
            cellLimit: 25,
            weightLimit: 15
        },
    }
}
