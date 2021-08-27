import ToDoList from "../pages/to-do-list/ToDoList";


import * as ROUTES from './routes.js';
import React from "react";

/**
 * @description Handling route configs
 */


export default function routeConfigs() {

    return [
        {exact: true, path: ROUTES.TO_DO_LIST, component: ToDoList}
    ]
}
