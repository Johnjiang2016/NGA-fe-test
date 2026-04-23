"use client";
import { type ReactNode } from "react";
import { Resizable } from "re-resizable";
interface Props {
    width: number;
    minWidth?: string | number;
    onResize: (width: number) => void;
    children: ReactNode;
}

export default function ResizableContainer({
    width,
    minWidth,
    onResize,
    children,
}: Props) {

    return (
        <Resizable
            size={{ width, height: "100%" }}
            minWidth={minWidth}
            enable={{ right: true }}
            onResizeStop={(e, dir, ref, d) => {
                onResize(width + d.width);
            }}
            onResizeStart={(e) => {
                // 防止触发 DND
                e.stopPropagation();
            }}
            handleClasses={{
                right: `
                w-3 cursor-col-resize
                flex items-center justify-center
                `,
            }}
        >
            {/* 视觉 handle */}
            <div className="relative h-full">
                {children}
                <div className="absolute right-0 top-0 h-full w-3 flex items-center justify-center pointer-events-none">
                    <div className="w-[2px] h-2/3 bg-gray-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
            </div>
        </Resizable>
    );
}