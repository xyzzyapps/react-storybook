export const arrayRemoveByValue = (array: any, value: any) => {
    return array.filter((e: any) => {
        return e != value;
    });
}
