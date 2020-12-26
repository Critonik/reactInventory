export interface IBodyCell {
    id?: number;
    item?: number;
    state?: number;
    weight?: number;
    createdDate?: string;
    description?: string;
    ownerType?: number;
    owner?: string;
    disabled?: boolean;
}


// item === 17 это оружие, === 20 - одежда
// в оружии - деск это просто строка. одежда - жсон
// {"Sex":0,"Slot":6,"Drawable":1,"Texture":0,"Torso":-1,"xSlot":-1,"xDrawable":-1,"xTexture":-1,"Description":"Обувь"}
// https://pastebin.com/fZWQSWfm  номер как в массиве
// костюмТрон, Неон,санты - жсон, но игнорить
//
// у всего остального - деск как нулл, либо стринг
// если деск !== null то, описание использовать
// кроме одежды, костюмов и не оружие - название картинки как в енаме