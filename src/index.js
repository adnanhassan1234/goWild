import React from "react";
import ReactDOM from "react-dom/client";
import App from "Containers/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./configureStore";
import './Style/global.scss';

 const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       {/*<React.StrictMode>*/}
//         <App />
//       {/*</React.StrictMode>*/}
//     </PersistGate>
//   </Provider>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
