import { Skeleton } from "@mui/material";

function TicketCardSkeleton() {
  return (
    <>
      <div className="flex flex-col">
        <Skeleton
          animation="wave"
          className="!mt-2 !w-full !h-14"
          variant="rounded"
        />
        <Skeleton
          animation="wave"
          className="!mt-2 !w-full !h-14"
          variant="rounded"
        />
        <Skeleton
          animation="wave"
          className="!mt-2 !w-full !h-14"
          variant="rounded"
        />
      </div>
    </>
  );
}

export default TicketCardSkeleton;
