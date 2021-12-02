import {createSlice} from '@reduxjs/toolkit'

const initial = [
    {
        strengths: [],
        weaknesses: [],
        criticals: []
    }
]


const statSlice = createSlice({
    name: 'stats',
    initialState: initial,
    reducers: {
        storeStats: (state, {payload}) => [...state, payload],
        removeAll: () => initial,
    }
});

export const {storeStats, removeAll} = statSlice.actions;
export default statSlice.reducer;