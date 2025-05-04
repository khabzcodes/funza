'use client';

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCards } from "@/components/section-cards";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Insights" description="View your classroom insights." />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}