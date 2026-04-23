import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => { };
/**
 * 用于判断Dom是否挂载，防止水合错误
 * @returns true: 已挂载，false: 未挂载
 */
export function useHasMounted() {
    const hasMounted = useSyncExternalStore(
        emptySubscribe,           // 订阅函数
        () => true,               // 客户端渲染时的值（快照）
        () => false               // 服务端渲染时的值（初始值）
    );
    return hasMounted;
}