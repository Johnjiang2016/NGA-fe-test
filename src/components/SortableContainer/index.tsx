"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePanelStore, type Panel } from "@/store/usePanelStore";
import ResizableContainer from "@/components/ResizableContainer";
import PanelContent from "@/components/Panel";



export default function SortableContainer({ panel, defaultWidth }: { panel: Panel, defaultWidth: number }) {
  const { panels, toggle, setPanels } = usePanelStore();
  const { setNodeRef, isDragging, transform, transition, attributes, listeners } = useSortable({ id: panel.id });
  const width = panel.resized ? panel.width : defaultWidth;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateWidth = (newWidth: number) => {
    const newPanels = panels.map((p) => p.id === panel.id ? { ...p, width: newWidth, resized: true } : p)
    setPanels(newPanels);
  }

  const dragProps = {
    ...attributes,
    ...listeners
  }

  const minWidth = `${Math.floor(1 / panels.length * 1000) / 10}%`

  return (
    <ResizableContainer width={width} minWidth={minWidth} onResize={updateWidth}>
      <div
        ref={setNodeRef}
        style={style}
        // 拖动增加阴影
        className={`h-full flex-1 flex flex-col shadow-md bg-white snap-start bg-gray-100 ${isDragging ? "shadow-2xl z-50 scale-105" : ""}`}
      >
        <div className="h-full flex flex-col" >
          <PanelContent id={panel.id} title={panel.title} onClose={toggle} dragProps={dragProps} />
        </div>
      </div>
    </ResizableContainer>
  );
}

