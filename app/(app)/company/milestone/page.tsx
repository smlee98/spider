import { cn } from "@/lib/utils";
import _ from "lodash";
import { history } from "./constants";

export default function IndexPage() {
  const historyItems = _.groupBy(history, (x) => new Date(x.year).getFullYear());

  return (
    <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col items-start justify-between gap-24 px-8 py-8 md:py-36">
      <div className="flex flex-col gap-4">
        <h1 className="text-foreground text-4xl leading-tight! font-black md:text-5xl">대명거미크레인의 연혁</h1>
        <p className="text-muted-foreground text-lg leading-relaxed! font-medium text-balance break-keep md:text-xl">
          대명거미크레인은 창립 이래로 끊임없는 혁신과 도전으로 성장해왔습니다. <br className="hidden md:block" />
          처음의 한 걸음이 큰 도약으로 이어지며, 항상 변화에 대한 열린 마음으로 시대의 흐름을 따라가고 있습니다.
        </p>
      </div>
      <div className="flex w-full flex-col">
        {Object.keys(historyItems)
          .sort((a, b) => Number(b) - Number(a))
          .map((items, groupIdx) => {
            const sortedHistory = _.groupBy(historyItems[items], (x) => x.year);
            return (
              <div
                className={cn(
                  "after:bg-primary relative flex flex-col items-start gap-12 pb-20 pl-12 after:absolute after:top-[6px] after:left-0 after:size-[10px] after:rounded-full after:content-[''] md:flex-row",
                  Object.keys(historyItems).length - 1 !== groupIdx &&
                    "before:bg-foreground/15 before:absolute before:top-4 before:-bottom-3 before:left-1 before:w-[2px] before:rounded before:content-['']"
                )}
                key={groupIdx}
              >
                <span className="text-lg leading-snug font-bold whitespace-nowrap!">{`${items}년`}</span>
                <div className="flex flex-1 flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    {Object.keys(sortedHistory).map((key) => (
                      <div
                        className="text-muted-foreground flex items-start gap-12"
                        id={key}
                        key={key}
                        data-index={groupIdx}
                        data-text={key}
                      >
                        <div className="flex flex-col gap-6 text-lg">
                          {sortedHistory[key].map((item, idx) => {
                            return (
                              <span
                                className={cn(
                                  "-mt-[3px] leading-relaxed font-medium text-balance break-keep",
                                  item.desc.indexOf("최초") > 0 && "text-foreground! font-semibold"
                                )}
                                key={idx}
                              >
                                {item.desc}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
