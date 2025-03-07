import { Skeleton } from "./skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "./card";

export default function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-5">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-6 flex-grow" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 w-1/2 mt-4" />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-5 border-t border-gray-200">
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
}
