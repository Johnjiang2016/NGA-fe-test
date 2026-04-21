"use client";

import {
    MapIcon,
    MusicalNoteIcon,
    ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
    map: MapIcon,
    music: MusicalNoteIcon,
    chat: ChatBubbleBottomCenterIcon,
};

export default function Sidebar({ panels, setPanels }: any) {
    const toggle = (id: string) => {
        setPanels((prev: any) =>
            prev.map((p: any) =>
                p.id === id ? { ...p, open: !p.open } : p
            )
        );
    };

    return (
        <div className="w-20 bg-gray-100 flex flex-col items-center py-4 gap-6">
            {panels.map((p: any) => {
                const Icon = iconMap[p.id];
                return (
                    <button key={p.id} onClick={() => toggle(p.id)}>
                        <Icon
                            className={`w-6 h-6 cursor-pointer ${p.open ? "text-black" : "text-gray-300"
                                }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}