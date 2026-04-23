"use client";
import Sidebar from "@/components/Sidebar";
import Workspace from "@/components/Workspace";
export default function Page() {

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧固定栏 */}
      <Sidebar />
      {/* 右侧面板区 */}
      <Workspace />
    </div>
  );
}

