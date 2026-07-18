import LoadingText from "@/components/Shared/LoadingText";

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-start">
      <LoadingText className="font-mono text-xl font-extralight" />
    </div>
  );
}