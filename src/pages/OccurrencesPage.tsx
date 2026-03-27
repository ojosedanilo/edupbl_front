import { useState } from 'react';
import { figmaAssets } from '@/config/figmaAssets';
import { FigmaImage } from '@/components/ui/FigmaImage';
import { GradientBackdrop } from '@/components/layout/GradientBackdrop';
import { FilterTabs, type OccurrenceFilter } from '@/components/dashboard/FilterTabs';
import { OccurrencesTable } from '@/components/dashboard/OccurrencesTable';

export default function OccurrencesPage() {
  const [filter, setFilter] = useState<OccurrenceFilter>('todos');

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackdrop />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10">
        <header className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <FigmaImage
              src={figmaAssets.crestLogo}
              alt=""
              className="size-12 rounded-full"
              fallbackClassName="size-12 rounded-full bg-white/10"
            />
            <div className="text-white">
              <p className="mb-0 text-sm font-semibold md:text-base">
                ESCOLA ESTADUAL DE EDUCAÇÃO
              </p>
              <p className="mb-0 text-sm font-semibold md:text-base">
                PROFISSIONAL PAULO BARBOSA LEITE
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold leading-none md:text-5xl">
              <span className="text-white">Edu</span>{' '}
              <span className="text-[#22c55e]">PBL</span>
            </div>
          </div>
        </header>

        <div className="mt-10 flex flex-col items-center gap-8">
          <FilterTabs value={filter} onChange={setFilter} />

          <div className="w-full">
            <OccurrencesTable />
          </div>
        </div>
      </div>
    </div>
  );
}

