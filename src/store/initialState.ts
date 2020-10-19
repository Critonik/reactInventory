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
        bracelet: {
            description: 'bracelet',
        },
        earrings: {
            description: 'earrings'
        },
        glasses: {
            description: 'glasses'
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
        hat: {
            description: 'hat'
        },
        jacket: {
            description: 'jacket'
        },
        knife: {
            description: 'knife'
        },
        mask: {
            description: 'mask'
        },
        pants: {
            description: 'pants'
        },
        parachute: {
            description: 'parachute'
        },
        pistol: {
            description: 'pistol'
        },
        policeman: {
            description: 'policeman'
        },
        shoes: {
            description: 'shoes'
        },
        tie: {
            description: 'tie'
        },
        watch: {
            description: 'watch'
        }
    },
    environment: {
        down: {
            data: [],
            title: ''
        },
        up: {
            data: [],
            title: ''
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
