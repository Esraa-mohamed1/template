// src/services/settingsService.ts

import { httpClient } from "./httpClient";
import { ENDPOINTS } from "../config/api";
import { ApiResponse, AppSetting, AppSettingsMap } from "../types/api";

const parseValue = (setting: AppSetting): boolean | string | number => {
  switch (setting.type) {
    case "boolean":
      return setting.value === "true";
    case "number":
      return Number(setting.value);
    case "json":
      try {
        return JSON.parse(setting.value);
      } catch {
        return setting.value;
      }
    default:
      return setting.value;
  }
};

const toMap = (settings: AppSetting[]): AppSettingsMap =>
  settings.reduce((acc, s) => {
    acc[s.key] = parseValue(s);
    return acc;
  }, {} as AppSettingsMap);

 let cachedSettings: AppSettingsMap | null = null;
let inFlight: Promise<AppSettingsMap> | null = null;

export const settingsService = {
   getAll: () =>
    httpClient.get<ApiResponse<AppSetting[]>>(ENDPOINTS.settings.list),

  // النسخة المريحة: object بدل array، مع كاش
  getMap: async (force = false): Promise<AppSettingsMap> => {
    if (cachedSettings && !force) return cachedSettings;
    if (inFlight && !force) return inFlight;

    inFlight = settingsService
      .getAll()
      .then((res) => {
        cachedSettings = toMap(res.data);
        return cachedSettings;
      })
      .finally(() => {
        inFlight = null;
      });

    return inFlight;
  },

  clearCache: () => {
    cachedSettings = null;
  },
};