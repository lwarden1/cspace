import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    BrowserRouter,
    RouterProvider,
    useNavigate,
    LoaderFunction,
} from "react-router-dom";
import axios from 'axios';
import App from './App';
import ErrorPage from './err';
import Classes from '@components/Classes';
import Login, { loginAction } from '@components/Login';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000,
});

// export const UserContext = React.createContext<SessionUser>(undefined);

// const [user, setUser] = React.useState<SessionUser>(undefined);

const loadUser: LoaderFunction = async () => {
    const user = await instance.get("/echo/user").then((res) => res.data);
    // shouldn't be able to access the app if not logged in, but this is a good check
    console.log(`User: ${JSON.stringify(user)}`)
    if (!user) {
        throw new Error("User not logged in");
    }
    return user;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: loadUser,
        id: "app",
        children: [
            {
                index: true,
                element: <Classes />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginAction,
    },
    {
        path: "/register",
        element: <div>Register</div>,
        errorElement: <ErrorPage />,
        // action: registerAction,
    }
]);

createRoot(document.getElementById('root')!, {}).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
