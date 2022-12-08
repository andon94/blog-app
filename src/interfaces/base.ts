import { ReactNode } from "react";

export interface Button {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
}

export interface ErrorInterface {
  [key: string]: unknown;
}

export interface BaseResponseInterface {
  data: any;
  loading: boolean;
  error: any;
}
