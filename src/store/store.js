// redux configuration
import { configureStore } from "@reduxjs/toolkit";

// Import file with reducer
import authReducer from "./actions/auth/authSlice";
import ComponentReducer from "./actions/componentSlice";
import emailReducer from "./actions/mail/emailSlice";
import foroRreducer from "./slices/foroSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    componente: ComponentReducer,
    email: emailReducer,
    foro: foroRreducer
  },
});
