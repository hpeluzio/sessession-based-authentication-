import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import type { Middleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const removeAccessTokenTransform = createTransform(
  // transform state when saving to storage
  (inboundState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...rest } = inboundState as any;
    return rest; // remove accessToken from what will be persisted
  },
  // transform state when loading from storage (rehydration)
  (outboundState) => {
    return { ...outboundState, accessToken: null }; // set accessToken to null when rehydrated
  },
  { whitelist: ["auth"] } // apply this transform only to the 'auth' reducer
);

const rootReducer = combineReducers({
  auth: authReducer,
  // add more reducers here later
  // user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist the 'auth' slice
  transforms: [removeAccessTokenTransform],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stateSyncMiddleware = createStateSyncMiddleware() as Middleware<any, any>;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(stateSyncMiddleware),
});

initMessageListener(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
