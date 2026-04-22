"use client";
import { useState } from "react";
import {
  type DragStartEvent,
  type DragEndEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";


import { usePanelStore } from "@/store/usePanelStore";
import PanelItem from "../PanelItem";

export default function PanelContainer() {
  const { panels, setPanels } = usePanelStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = panels.findIndex((p) => p.id === active.id);
    const newIndex = panels.findIndex((p) => p.id === over.id);

    setPanels(arrayMove(panels, oldIndex, newIndex));
    setActiveId(null);
  };
  // 当全部关闭时显示 显示空
  const isEmpty = !panels.some(p => p.open)

  return (
    <div className="flex-1 overflow-x-auto snap-x">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(e: DragStartEvent) => setActiveId(e.active.id)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={panels.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex h-full">
            {isEmpty ? <Empty /> : panels.map(
              (p) => p.open && <PanelItem key={p.id} panel={p} />
            )}
          </div>
        </SortableContext>

        {/* 自定义拖拽浮层 */}
        <DragOverlay>
          {activeId && (
            <div className="w-[300px] h-[200px] bg-white shadow-2xl rounded pt-20 text-center">自定义拖拽浮层-{activeId}</div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

const Empty = () => {
  return <div className="pt-20 pl-20">No Panels Open</div>
}