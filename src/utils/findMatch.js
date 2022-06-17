// returns stat data from the array that matches the types provided,
// or undefined if no match found

export const findTypeMatch = (types, statArray) => {
    const type1 = types[0];
    const type2 = types[1] || null;
    const match = statArray.find((stat) => {
        if(type2){
            return (stat.type1 === type1.type.name) && (stat.type2 === type2.type.name )
        }
        return (stat.type1 === type1.type.name) && (stat.type2 === null);
    });
    return match;
}