"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePanelStore, type Panel } from "@/store/usePanelStore";
import ResizablePanel from "@/components/ResizablePanel";
import PanelContent from "@/components/PanelContent";


export default function SortablePanel({ panel, defaultWidth }: { panel: Panel, defaultWidth: number }) {
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

  return (
    <ResizablePanel width={width} onResize={updateWidth}>
      <div
        ref={setNodeRef}
        style={style}
        // 拖动增加阴影
        className={`h-full flex-1 flex flex-col shadow-md bg-white snap-start bg-gray-100 ${isDragging ? "shadow-2xl z-50 scale-105" : ""}`}
      >
        <div className="h-full" >
          <PanelContent id={panel.id} title={panel.title} onClose={toggle} dragProps={dragProps} />
        </div>
      </div>
    </ResizablePanel>
  );
}

