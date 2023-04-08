"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/category.type";

export default function Category(props: ICategory) {
  const pathname = usePathname();
  return (
    <Link
      href={`/${props.alias}`}
      className={pathname == `/${props.alias}` ? "category_active" : ""}
    >
      <div className="category">
        <Image src={props.image} width={24} height={24} alt="category" />
        <div>{props.name}</div>
      </div>
    </Link>
  );
}
