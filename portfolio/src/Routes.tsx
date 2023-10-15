import React, { Component } from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";

import Layout from './Layout';

// Pages
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import About from './pages/About';

interface ComponentsMap {
    [key: string]: React.ComponentType<any>;
}
const componentsMap: ComponentsMap = { Home, NotFound, About, Projects, Contact };
const pages: string[] = Object.keys(componentsMap).filter((name) => name !== "NotFound");

export function getRoutes() {
    return pages;
}

export function getElementByRoute(pageName: string) {
    const DynamicComponent = componentsMap[pageName];
    if (DynamicComponent) {
        return <DynamicComponent />;
    }
    return <NotFound />;
};

export function Routes() {

    return (
        <ReactRoutes>
            <Route element={<Layout />}>
                <Route path="/" key="default" element={<Home />} />
                {getRoutes().map((page) => (
                    <Route path={"/" + page} key={page} element={getElementByRoute(page)} />
                ))}
                <Route path="*" key="notFound" element={<NotFound />} />
            </Route>
        </ReactRoutes>
    )
}

export default Routes