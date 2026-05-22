import clsx from "clsx";

type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <hr className={clsx("border-0 border-t border-[#eadfce]", className)} />;
}
