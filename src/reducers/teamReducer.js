import {createSlice} from '@reduxjs/toolkit'

const initial = []

const teamSlice = createSlice({
    name: 'team',
    initialState: initial,
    reducers: {
        add: (state, {payload}) => [...state, payload],
        clear: () => [],
    }
});

export const {add, clear} = teamSlice.actions;
export default teamSlice.reducer;