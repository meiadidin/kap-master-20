
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type OverviewCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  href: string;
  color?: string;
  isLoading?: boolean;
};

const OverviewCard = ({
  title,
  value,
  icon,
  href,
  color = "bg-blue-50",
  isLoading = false,
}: OverviewCardProps) => {
  return (
    <Link
      to={href}
      className="block"
    >
      <div className="bg-white rounded-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
        {isLoading ? (
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{title}</p>
              <h2 className="text-3xl font-bold">{value}</h2>
            </div>
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", color)}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default OverviewCard;
