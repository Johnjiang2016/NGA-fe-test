"use client";

import { MapIcon, MusicalNoteIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { usePanelStore } from "@/store/usePanelStore";

const icons = {
    map: MapIcon,
    music: MusicalNoteIcon,
    chat: ChatBubbleBottomCenterIcon,
};

export default function Sidebar() {
    const { panels, toggle } = usePanelStore();

    return (
        <div className="w-20 bg-gray-100 flex flex-col items-center py-4 gap-6">
            {panels.map((p) => {
                const Icon = icons[p.id];
                return (
                    <button key={p.id} onClick={() => toggle(p.id)} title={p.title}>
                        <div className={`flex flex-col items-center ${p.open ? "text-black" : "text-gray-300"}`}>
                            <Icon className="w-6 h-6 transition cursor-pointer" />
                            <span className="text-xs mt-1"> {p.title}</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}