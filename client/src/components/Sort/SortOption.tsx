import Link from "next/link";
import { ISortOption } from "@/types/sortOption.type";
import { usePathname } from "next/navigation";

interface SortOptionProps {
  item: ISortOption;
}

export default function SortOption(props: SortOptionProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`${props.item.alias}`}
      className={
        pathname == `${props.item.alias}` ? "sort_option_active" : "sort_option"
      }
    >
      {props.item.name}
    </Link>
  );
}
