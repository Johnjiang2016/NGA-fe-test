"use client";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PanelContainer from "@/components/PanelContainer";
import { usePanelSync } from "@/hooks/usePanelSync";
import { useHasMounted } from "@/hooks/useHasMounted";
import { usePanelStore } from "@/store/usePanelStore";

export default function Page() {
  const { setPanels } = usePanelStore();
  // 防止水合错误
  const hasMounted = useHasMounted();
  // 初始化：localStorage → state
  useEffect(() => {
    const saved = localStorage.getItem("panels");
    if (saved) {
      setPanels(JSON.parse(saved));
    }
  }, []);

  // URL 同步
  usePanelSync();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧固定栏 */}
      <Sidebar />
      {/* 右侧面板区 */}
      {hasMounted ? <PanelContainer /> : <Loading />}
    </div>
  );
}

const Loading = () => {
  return <div className="flex-1 text-center p-8">loading...</div>
}