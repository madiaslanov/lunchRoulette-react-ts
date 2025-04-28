import {combineReducers} from "@reduxjs/toolkit";
import cardReducer from "../components/card/model/cardReducer.ts";
import sideBarReducer from "../components/sideBar/model/sideBarReducer.ts";
import chatReducer from "../components/header/model/headerReducer.ts"

export const rootReducer = combineReducers({
    cardPage : cardReducer,
    sideBarPage: sideBarReducer,
    chatPage: chatReducer,
})