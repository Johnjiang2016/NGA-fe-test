"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import PanelItem from "./PanelItem";

export default function PanelContainer({ panels, setPanels }: any) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = panels.findIndex((p: any) => p.id === active.id);
      const newIndex = panels.findIndex((p: any) => p.id === over.id);

      setPanels(arrayMove(panels, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={panels.map((p: any) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex h-full">
            {panels.map((p: any) =>
              p.open ? (
                <PanelItem key={p.id} panel={p} setPanels={setPanels} />
              ) : null
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}