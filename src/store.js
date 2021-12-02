import {configureStore} from '@reduxjs/toolkit'
import team from './reducers/teamReducer'
import stats from './reducers/statsReducer';

const store = configureStore({
    reducer: {
        team,
        stats
    }
});

export default store