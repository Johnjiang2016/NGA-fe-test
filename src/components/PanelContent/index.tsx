import { XMarkIcon } from "@heroicons/react/24/outline";
import { type PanelType } from "@/store/usePanelStore";

type PanelContentProps = {
    id: PanelType;
    title: string;
    dragProps: object;
    onClose: (id: PanelType) => void;
}

/**
 * 面板内容组件
 */
export default function PanelContent({ id, title, dragProps, onClose }: PanelContentProps) {
    return <>
        <div {...dragProps} className="p-5 font-semibold text-gray-800 border-b border-gray-300 cursor-grab flex justify-between">
            <div className="flex-1">
                {title}
            </div>
            <XMarkIcon onClick={() => onClose(id)} className="w-5 h-5 cursor-pointer" />
        </div>

        <div className="h-full flex-1 p-8">
            <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-500 h-full p-4">
                <h3 className="text-xl">{title}</h3>
                <p className="text-xs pt-2">
                    面板宽度可以自定义，试试向左拖动右边的边框
                </p>
            </div>
        </div>
    </>
}