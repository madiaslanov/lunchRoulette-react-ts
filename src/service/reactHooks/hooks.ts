import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/rootStore.ts";

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector : TypedUseSelectorHook<RootState> = useSelector;