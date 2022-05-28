import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../features/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;
