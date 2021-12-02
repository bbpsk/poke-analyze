import axios from 'axios'

export async function calcStats(pokemon){
    try{
        const typesArr = pokemon.types;
        let allResists = []
        let allWeaks = []
        let allStrngs = []

        for(let type of typesArr){
            let {data: typeData} = await axios.get(type.type.url)
            console.log(typeData.name, typeData.damage_relations)

            let weakArr = typeData.damage_relations.double_damage_from;
            allWeaks = allWeaks.concat(weakArr.map(type => type.name));

            let resists = typeData.damage_relations.half_damage_from;
            resists = resists.concat(typeData.damage_relations.no_damage_from)
            allResists = allResists.concat(resists.map(type => type.name));

            let strengthArr = typeData.damage_relations.double_damage_to;
            allStrngs = allStrngs.concat(strengthArr.map(type => type.name));
            
        }
        console.log(allWeaks, allStrngs, allResists);

        let strngs = [...new Set(allStrngs)]; //remove duplicates

        let critical = allWeaks.filter(weakness => allWeaks.indexOf(weakness) !== allWeaks.lastIndexOf(weakness)) //more than one instance of a weakness
        critical = [...new Set(critical)]

        let weaks = [...new Set(allWeaks)]; 
        weaks = weaks.filter(weakness => !allResists.includes(weakness));

        console.log(strngs, weaks, critical);
        return {strengths: strngs, weaknesses: weaks, criticals: critical}

    } catch(err){
        console.log(err)
    }
}