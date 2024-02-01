import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import global_en from "./translation/en/global.json";
import global_am from "./translation/amharic/global.json";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "ኣማ", // language to use
  resources: {
    en: {
      global: global_en, // 'common' is our custom namespace
    },
    ኣማ: {
      global: global_am,
    },
  },
});

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);