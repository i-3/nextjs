import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <div className=' bg-background w-screen flex justify-center items-center'>
      <h1 className={`${lusitana.className}  text-2xl`}>Home Page</h1>
    </div>
  );
}
