import { Skeleton } from "@mui/material";

function CardSkeleton() {
  return (
    <>
      <div className="flex flex-col">
        <Skeleton animation="wave" className="!mt-2 !w-48 !h-52" variant="rounded" />
        <Skeleton animation="wave" className="!mt-2 !w-48 !h-52" variant="rounded" />
        <Skeleton animation="wave" className="!mt-2 !w-48 !h-52" variant="rounded" />
      </div>
    </>
  );
}

export default CardSkeleton;
