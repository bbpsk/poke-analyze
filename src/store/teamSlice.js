import {createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit'
import axios from 'axios';
import { calcStats, findTypeMatch } from '../utils';
import config from '../config';

const clear = createAction('team/clear');

const getPokemon = createAsyncThunk('team/getPokemon', 
    async (keyword) => {
        const url = config.pokeAPIurl + 'pokemon/' + keyword;
        const response = await axios.get(url);
        return response.data;
    }
);
const getTypes = createAsyncThunk('team/getTypes', 
    async (types, {getState}) => {
        const state = getState();
        const match = findTypeMatch(types, state.team.stats);
        if(match){  //pokemon type's stats already exist
            const index = state.team.stats.indexOf(match);
            return index;
        }
        const type1 = types[0];
        const type2 = types[1] || null;
        const response1 = await axios.get(type1.type.url);
        const response2 = type2 ? await axios.get(type2.type.url) : null;
        console.log(response1, response2);
        const stats = calcStats(response1.data, response2?.data);
        return {
          ...stats,
          type1: type1.type.name,
          type2: type2 ? type2.type.name : null,
        };
    }
)

const initial = {
    members: [],
    stats: [{
        type1: '',
        type2: '',
        strengths: [],
        weaknesses: [],
        criticals: []
    }],
    status: 'ok',
    error: ''
};

const teamReducer = createReducer(initial, (builder) => {
    builder
    .addCase(clear, () => initial)
    .addCase(getPokemon.pending, (state) => {
        state.status = 'memberLoading';
    })
    .addCase(getPokemon.rejected, (state, action) => {
        console.log(action.error);
        state.status = action.error.message.includes('404') ? 'has404Error' : 'hasSearchError';
        state.error = action.error.message;
    })
    .addCase(getPokemon.fulfilled, (state, action) => {
        console.log('added pokemon success');
        state.status = 'ok';
        state.members = [...state.members, action.payload];
    })
    .addCase(getTypes.pending, (state) => {
        state.status = 'typeLoading';
    })
    .addCase(getTypes.rejected, (state, action) => {
        console.log(action.error);
        state.status = 'hasTypesError';
    })
    .addCase(getTypes.fulfilled, (state, action) => {
        state.status = 'ok'
        if(action.payload.type1){
            state.stats = [...state.stats, action.payload];
        }
        else {
            state.stats[action.payload].pokemonUsing++;
        }
    })
});

export default teamReducer;
export { clear, getPokemon, getTypes };

export const selectMemebers = (state) => state.team.members;
export const selectStats = (state) => state.team.stats;
