export interface ICellData {
    id: number;
    item: number;
    state: number;
    weight: number;
    createdDate: string;
    description: string;
    ownerType: number;
    owner: string;
    type?: string
}