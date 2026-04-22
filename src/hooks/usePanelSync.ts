"use client";

import { useEffect } from "react";
import { usePanelStore } from "@/store/usePanelStore";
import { useSearchParams, useRouter } from "next/navigation";

/**
 *  根据URL还原打开的面板（复制URL给第三个人，可以直接还原面板）
 */
export function usePanelSync() {
    const { panels, setPanels } = usePanelStore();
    const params = useSearchParams();
    const router = useRouter();

    // URL → state
    useEffect(() => {
        const open = params.get("open");
        if (open) {
            const openIds = open.split(",");
            setPanels(
                panels.map((p) => ({
                    ...p,
                    open: openIds.includes(p.id),
                }))
            );
        }
    }, []);

    // state → URL
    useEffect(() => {
        const openIds = panels.filter((p) => p.open).map((p) => p.id);
        router.replace(`?open=${openIds.join(",")}`);
    }, [panels]);
}