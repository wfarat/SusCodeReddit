import { configureStore } from '@reduxjs/toolkit';
import hotSlice from '../features/hot/hotSlice';
import subredditsSlice from '../features/subreddits/subredditsSlice';
export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
    hot: hotSlice,
  },
});
