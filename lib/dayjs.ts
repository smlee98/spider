import dayjs, { extend, locale } from "dayjs";
import "dayjs/locale/ko";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
locale("ko");
extend(duration);
extend(relativeTime);
export { dayjs };
