import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import productsReducer from '../features/Products/productsSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../features/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    user: userReducer,
    productsData: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;
