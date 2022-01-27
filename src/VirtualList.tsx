import { createSignal } from "solid-js";
import { VirtualListProps } from "./interface";
import styles from "./VirtualList.module.css";
const VirtualList = ({ rowRenderer }: VirtualListProps) => {
  // item高度
  const ITEM_HEIGHT = 50;
  // item数量
  const ITEM_NUMBER = 12000;
  // view视图高度
  const VIEW_HEIGHT = 400;
  // 实际渲染的item数量
  const RENDER_NUMBER = 10;
  // 最大滚动距离
  const MAX_SCROLL_DISTANCE = ITEM_HEIGHT * ITEM_NUMBER - VIEW_HEIGHT;
  // 可视区列表
  const viewArr = new Array(RENDER_NUMBER).fill(0).map((d, i) => d + i);
  // 可视区向上偏移的距离
  const [getOffset, setOffset] = createSignal(0);
  // 可视区向上偏移的item数量
  const [getOffsetNum, setOffsetNum] = createSignal(0);
  let ref: any;
  const handleScroll = (ev: UIEvent) => {
    const { scrollTop = 0 } = ref ?? {};

    // 滚动到底部
    if (MAX_SCROLL_DISTANCE <= scrollTop) {
      setOffsetNum(ITEM_NUMBER - RENDER_NUMBER);
      setOffset(MAX_SCROLL_DISTANCE);
      return;
    }
    // 滚动item数量
    const offsetNum = Math.floor(scrollTop / ITEM_HEIGHT);
    // 多余不足一个item高度的距离
    const remainHeight = scrollTop % ITEM_HEIGHT;
    setOffsetNum(offsetNum);
    setOffset(scrollTop - remainHeight);
  };
  return (
    <div
      class={styles["view-area"]}
      style={{ height: `${VIEW_HEIGHT}px` }}
      ref={ref}
      onScroll={handleScroll}
    >
      <div style={{ height: `${ITEM_NUMBER * ITEM_HEIGHT}px` }}>
        <div
          class={styles["virtual-inner"]}
          style={{ transform: `translateY(${getOffset()}px)` }}
        >
          {viewArr.map((d) => {
            const index = d + getOffsetNum();
            return rowRenderer({ index, domIndex: d });
          })}
        </div>
      </div>
    </div>
  );
};
export default VirtualList;
