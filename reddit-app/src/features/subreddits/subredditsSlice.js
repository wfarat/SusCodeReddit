import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Reddit from '../../util/reddit/Reddit';

export const loadSubs = createAsyncThunk('subreddits/loadSubs', 
async (term) => { 
    const data = await Reddit.search(term);
    return data;
})
const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {data: [], status: 'idle'},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubs.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(loadSubs.fulfilled, (state,action) => {
                state.status = 'idle';
                state.data = action.payload;
            })
    }    
})
export const selectSubreddits = (state) => state.subreddits.data;
export default subredditsSlice.reducer;