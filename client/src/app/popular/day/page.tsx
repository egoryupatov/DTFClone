import Sort from "@/components/Sort/Sort";
import News from "@/components/News/News";

export default function Day() {
  return (
    <>
      <Sort />
      <div className="feed">
        <News />
      </div>
    </>
  );
}
