import { Skeleton } from "@mui/material";

function DashboardSkeleton() {
  return (
    <>
      <div>
        <Skeleton animation="wave" className="mt-2 rounded-lg" variant="rectangular" height={56} />
        <Skeleton animation="wave" className="mt-2 rounded-lg" variant="rectangular" height={56} />
        <Skeleton animation="wave" className="mt-2 rounded-lg" variant="rectangular" height={56} />
      </div>
    </>
  );
}

export default DashboardSkeleton;
