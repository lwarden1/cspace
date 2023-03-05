import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div>
            <NavBar />
            <React.Suspense fallback={<div>Loading...</div>}>
                <div id="detail">
                    <Outlet />
                </div>
            </React.Suspense>
        </div>
    );
}
