import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../state/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
