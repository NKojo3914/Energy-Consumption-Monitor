import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh] w-full">
      <LoadingSpinner size="lg" className="text-blue-500" />
    </div>
  )
}
