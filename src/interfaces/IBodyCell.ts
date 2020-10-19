export interface IBodyCell {
    id?: number;
    item?: number;
    state?: number;
    weight?: number;
    createdDate?: string;
    description?: string | JSON | null;
    ownerType?: number;
    owner?: string;
}


// item === 17 это оружие, === 20 - одежда
// в оружии - деск это просто строка. одежда - жсон
// https://pastebin.com/fZWQSWfm  номер как в массиве
// костюмТрон, Неон,санты - жсон, но игнорить
//
// у всего остального - деск как нулл, либо стринг
// если деск !== null то, описание использовать
// кроме одежды, костюмов и не оружие - название картинки как в енаме