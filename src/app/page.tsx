"use client";
import Sidebar from "@/components/Sidebar";
import PanelContainer from "@/components/PanelContainer";
import Loading from "@/components/Loading";
import { useHasMounted } from "@/hooks/useHasMounted";

export default function Page() {
  // 防止水合错误
  const hasMounted = useHasMounted();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧固定栏 */}
      <Sidebar />
      {/* 右侧面板区 */}
      {hasMounted ? <PanelContainer /> : <Loading />}
    </div>
  );
}

