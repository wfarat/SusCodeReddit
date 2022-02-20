import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Reddit from '../../util/reddit/Reddit';

export const loadHot = createAsyncThunk('subreddits/loadSubs', 
async (term) => { 
    const data = await Reddit.hot();
    return data;
})
const hotSlice = createSlice({
    name: 'hot',
    initialState: {data: [], status: 'idle'},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadHot.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(loadHot.fulfilled, (state,action) => {
                state.status = 'idle';
                state.data = action.payload;
            })
    }    
})
export const selectHot = (state) => state.hot.data;
export default hotSlice.reducer;