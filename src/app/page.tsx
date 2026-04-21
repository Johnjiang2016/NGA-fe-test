"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PanelContainer from "@/components/PanelContainer";

export type PanelType = "map" | "music" | "chat";

export interface Panel {
  id: PanelType;
  title: string;
  open: boolean;
}

export default function Page() {
  const [panels, setPanels] = useState<Panel[]>([
    { id: "map", title: "Map", open: true },
    { id: "music", title: "Music", open: true },
    { id: "chat", title: "Chat", open: true },
  ]);

  return (
    <div className="flex h-screen">
      <Sidebar panels={panels} setPanels={setPanels} />
      <PanelContainer panels={panels} setPanels={setPanels} />
    </div>
  );
}