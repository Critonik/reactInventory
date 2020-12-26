export const weightConverter = (num: number): string => {
    return  num >= 1000 ? `${(num / 1000).toFixed(2)}кг` : `${num}г`
}