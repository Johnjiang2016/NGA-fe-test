"use client";

import { create } from "zustand";

export type PanelType = "map" | "music" | "chat";

export interface Panel {
    id: PanelType;
    title: string;
    open: boolean;
    width: number
}

interface PanelState {
    panels: Panel[];
    setPanels: (panels: Panel[]) => void;
    toggle: (id: PanelType) => void;
}

const defaultPanels: Panel[] = [
    { id: "map", title: "Map", open: true, width: 320 },
    { id: "music", title: "Music", open: true, width: 320 },
    { id: "chat", title: "Chat", open: true, width: 320 },
];

export const usePanelStore = create<PanelState>((set) => ({
    panels: defaultPanels,

    setPanels: (panels) => {
        set({ panels });
    },

    toggle: (id) =>
        set((state) => {
            const panels = state.panels.map((p) =>
                p.id === id ? { ...p, open: !p.open } : p
            );
            return { panels };
        }),
}));