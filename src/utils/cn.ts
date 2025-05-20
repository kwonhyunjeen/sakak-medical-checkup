import { cx } from "classix";
import { twMerge } from "tailwind-merge";

type ClassName = string | false | null | undefined;

export function cn(...classNames: ClassName[]) {
  return twMerge(cx(...classNames));
}
