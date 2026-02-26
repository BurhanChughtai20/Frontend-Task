import type { ReactElement, ComponentType } from "react";

export type RouteMeta = {
  id: string;
  name: string;
  path: `/${string}` | "/";
  element: ReactElement;
  layout?: ComponentType<{ children: ReactElement }>;
  showInMenu?: boolean;
};