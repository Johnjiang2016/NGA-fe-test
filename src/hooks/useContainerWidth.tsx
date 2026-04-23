import { useRef, useEffect, useState } from "react";

/**
 * 获取容器的宽度
 * @returns [containerRef, containerWidth]
 * containerRef: 需要绑定的容器ref
 * containerWidth: 容器的宽度
 */
export default function useContainerWidth() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            setContainerWidth(containerRef.current!.offsetWidth);
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return { containerRef, containerWidth }
}