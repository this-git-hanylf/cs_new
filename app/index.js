// import { persistor, store } from "./reducers";
import { persist, store } from "./reducers";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
console.disableYellowBox = true;
import * as Utils from "@utils";
Utils.setupLayoutAnimation();

const Mazi = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persist(() => {
      setTimeout(() => {
        setReady(true);
      }, 1000);
    });
  });
  return ready ? (
    <Provider store={store}>
      {/* <PersistGate loading={null}> */}
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>
  ) : null;
};

export default Mazi;
