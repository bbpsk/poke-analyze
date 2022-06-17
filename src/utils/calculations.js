import axios from "axios";
import config from "../config";

// function that determines strengths, weaknesses, and critical weaknesses
// from the type data provided, and returns them in
// an object with three arrays containing the type names. Critical weaknesses are 
// a subset of weaknesses

// @param type1: string, type2: string
// @return { strengths: string[], weaknesses: string[], criticals: string[] }
export function calcStats(type1, type2){
    console.log(type1.name, type1.damage_relations);
    let weaks = type1.damage_relations.double_damage_from;
    let resists = type1.damage_relations.half_damage_from;
    let strengths = type1.damage_relations.double_damage_to;
    let immunes = type1.damage_relations.no_damage_from;

    if(type2){
        console.log(type2.name, type2.damage_relations);
        weaks = [...weaks, ...type2.damage_relations.double_damage_from];
        resists = [...resists, ...type2.damage_relations.half_damage_from];
        strengths = [...strengths, ...type2.damage_relations.double_damage_to];
        immunes = [...immunes,  ...type2.damage_relations.no_damage_from];
    }
    
    const allWeaks = weaks.map(type => type.name);
    const allResists = resists.map(type => type.name);
    const allStrs = strengths.map(type => type.name);
    const allImmunes = immunes.map(type => type.name);

    const strSet = [...new Set(allStrs)]; //remove duplicates

    const filteredWeaks = allWeaks.filter(weakness => 
        !(allResists.includes(weakness) || allImmunes.includes(weakness))
    );
    //if a type is a resistance or immunity, it cancels out the weakness
    const weakSet = [...new Set(filteredWeaks)]; 

    const criticals = allWeaks.filter(weakness => 
        allWeaks.indexOf(weakness) !== allWeaks.lastIndexOf(weakness)
    );
    //more than one instance of a weakness = critical
    const critSet = [...new Set(criticals)];

    console.log('final strengths, weaks, and crits', strSet, weakSet, critSet);
    return {strengths: strSet, weaknesses: weakSet, criticals: critSet}
}

export const analyzeStats = async (allWeaks, allStrs, numOfMembers) => {
    const res = await axios.get(config.pokeAPIurl+'type');
    const allTypes = res.data.results.slice(0, 18).map(type => type.name); //only 18 types

    const teamBlindSpots = allTypes.filter(type => !allStrs.includes(type));
    let teamWeaks = [];

    allWeaks.forEach((weakness) => {
        const times = appearsNTimes(weakness, allWeaks);
        if (times/numOfMembers >= 0.5 && !teamWeaks.includes(weakness)){
            teamWeaks.push(weakness);
        }
    });

    console.log('blind spots: ', teamBlindSpots, 'weaknesses', teamWeaks);
    return {blindSpots: teamBlindSpots, weaknesses: teamWeaks};
}

const appearsNTimes = (value, arr) => {
    let c = 0;
    arr.forEach((element) => {
        if(value === element) c+= 1 
    });
    return c;
}