"use client";
import React, { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode;
  user?: any;
}

export const Provider: FC<ProviderProps> = ({ children, user }) => {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
