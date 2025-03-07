import SkeletonCard from "@/components/ui/SkeletonCard";

export default function loading() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {"abcdefg".split("").map((i) => (
          <SkeletonCard
            key={i}
          /> /*abcdefg 7 characters to loop 7 times as 7 cards */
        ))}
      </div>
    </main>
  );
}
