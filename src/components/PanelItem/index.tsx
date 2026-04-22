"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePanelStore, Panel } from "@/store/usePanelStore";
import ResizablePanel from "../ResizablePanel";



export default function PanelItem({ panel }: { panel: Panel }) {
  const { panels, toggle, setPanels } = usePanelStore();
  const { setNodeRef, isDragging, transform, transition, attributes, listeners } = useSortable({ id: panel.id });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateWidth = (newWidth: number) => {
    setPanels(
      panels.map((p) =>
        p.id === panel.id ? { ...p, width: newWidth } : p
      )
    );
  }

  // console.log('attributes listeners', { attributes, listeners })

  return (
    <ResizablePanel width={panel.width} onResize={updateWidth}>
      <div
        ref={setNodeRef}
        style={style}
        // 拖动增加阴影
        className={`h-full flex-1 flex flex-col border-r bg-white snap-start ${isDragging ? "shadow-2xl z-50 scale-105" : ""}`}
      >
        <div className="p-3 border-b cursor-move flex justify-between" >
          <div
            {...attributes}
            {...listeners}
            className="flex-1">
            {panel.title}
          </div>
          <XMarkIcon onClick={() => toggle(panel.id)} className="w-5 h-5 cursor-pointer" />
        </div>

        <div className="flex-1 p-4">Content</div>
      </div>
    </ResizablePanel>
  );
}