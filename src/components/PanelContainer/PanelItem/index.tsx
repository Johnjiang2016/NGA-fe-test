"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PanelItem({ panel, setPanels }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: panel.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const close = () => {
    console.log('close >>>>>>', panel.id)
    setPanels((prev: any) =>
      prev.map((p: any) =>
        p.id === panel.id ? { ...p, open: false } : p
      )
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-[300px] border-l flex flex-col bg-white flex-1"
    >
      <div
        className="flex justify-between items-center p-3 border-b cursor-move"
      >
        <div
          {...attributes}
          {...listeners}
          className="flex-1"
        >
          {/*  */}
          <span>{panel.title}</span>
        </div>

        <XMarkIcon onClick={close} className="w-5 h-5 cursor-pointer" />
      </div>


      {/* 内容区 */}
      <div className="flex-1 p-4">Content</div>
    </div>
  );
}