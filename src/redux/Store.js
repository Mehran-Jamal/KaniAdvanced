import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import UnitReducer from "./Slice/UnitSlice"
import LocationReducer from "./Slice/LocationSlice";
import MaterialReducer from "./Slice/MaterialSlice";
import SupplierReducer from "./Slice/SupplierSlice";
import ColorReducer from "./Slice/ColorGroupSlice";
import orderTypeReducer from "./Slice/OrderTypeSlice";
import productGroupReducer from "./Slice/ProductGroup";
import customerGroupReducer from "./Slice/CustomerGroupSlice";
import productCategoryReducer from "./Slice/ProductCategory";
import styleReducer from "./Slice//StyleSlice";
import designReducer from "./Slice/DesignSlice";
import sizeReducer from "./Slice/SizeSlice";
import HsnReducer from "./Slice/HsnCodeSlice";
import OrderReducer from "./Slice/OrderNo";
import ThemeSlice from "./Slice/ThemeSlice";


// Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Persisted reducers
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    theme: ThemeSlice,
  })
);

// Root reducer
const rootReducer = combineReducers({
  persisted: persistedReducer,
  // Add non-persisted reducers here
  nonPersisted: combineReducers({
    unit: UnitReducer,
    location: LocationReducer,
    material: MaterialReducer,
    supplier: SupplierReducer,
    color:ColorReducer,
    orderType:orderTypeReducer,
    productGroup:productGroupReducer,
    customerGroup:customerGroupReducer,
    productCategory:productCategoryReducer,
    style:styleReducer,
    design:designReducer,
    size:sizeReducer,
    hsn:HsnReducer,
    order:OrderReducer


  }),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
