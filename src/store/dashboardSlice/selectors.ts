import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectAllDashboard = (state: RootState) => state.dashboard;

// const selectDashboard = (state: RootState) => state.dashboard

export const selectDashboard = createSelector(
  [selectAllDashboard],
  (dashboard) => dashboard
)