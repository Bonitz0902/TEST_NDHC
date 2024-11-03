import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {store} from "./app/store.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage";
import {DetailPage} from "./pages/DetailPage";
import {LoginPage} from "./pages/LoginPage";
import {ProtectedRoute} from "./ProtectedRoute";


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: (

                <App/>

        ),
        errorElement: <ErrorPage/>,
    },
    {
        path: "/inventory-items",
        element: (

                <DetailPage/>

        ),
    }, {
        path: "/login",
        element: (

                <LoginPage/>

        ),
    }
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
