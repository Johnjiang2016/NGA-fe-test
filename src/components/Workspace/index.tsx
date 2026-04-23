"use client";
import { useState } from "react";
import { type DragEndEvent, DragOverlay, DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { usePanelStore, type Panel } from "@/store/usePanelStore";
import SortableContainer from "@/components/SortableContainer";
import useContainerWidth from "@/hooks/useContainerWidth";

export default function Workspace() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { panels, setPanels } = usePanelStore();
  const { containerRef, containerWidth } = useContainerWidth();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 必须移动 5px 才触发拖拽
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const oldIndex = panels.findIndex((p) => p.id === active.id);
    const newIndex = panels.findIndex((p) => p.id === over.id);
    setPanels(arrayMove(panels, oldIndex, newIndex));
    setActiveId(null);
  };


  return (
    <div className="flex-1 overflow-x-auto snap-x">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // 在可视区域内移动
        modifiers={[restrictToWindowEdges]}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragCancel={() => setActiveId(null)}
        onDragEnd={handleDragEnd}  >
        <SortableContext items={panels.map((p) => p.id)} strategy={horizontalListSortingStrategy}   >
          <div ref={containerRef} className="flex h-full min-w-4xl" >
            <SortableItemList panels={panels} containerWidth={containerWidth} />
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="flex items-center justify-center w-[300px] h-[50px] bg-gray-100 shadow-2xl rounded scale-105 pointer-events-none">
              {activeId} dragging ...
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

}

function SortableItemList({ panels, containerWidth }: { panels: Panel[], containerWidth: number }) {
  // 计算打开的面板数量，平均分配宽度
  const openLen = panels.filter((p) => p.open).length;
  // 面板全部关闭时
  const allClose = openLen === 0;
  // 平均分配宽度
  const defaultWidth = Math.floor(containerWidth / openLen)
  // 当全部关闭时显示 显示空
  if (allClose) return <Empty />
  return panels.map((p: Panel) => p.open && <SortableContainer key={p.id} panel={p} defaultWidth={defaultWidth} />)
}

// 当没有打开的面板时显示
function Empty() {
  return <div className="pt-20 pl-20">No Panels Open</div>
}