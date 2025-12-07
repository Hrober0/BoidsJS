import { IconChevronDown } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useAlignmentPrincipleStore } from '../store/alignmentPrincipleStore.ts';
import { useCohesionPrincipleStore } from '../store/cohesionPrincipleStore.ts';
import { useGeneralSettingStore } from '../store/generalSettingStore.ts';
import { useSeparationPrincipleStore } from '../store/separationPrincipleStore.ts';
import { Section } from './Section.tsx';
import { SectionTitle } from './SectionTitle.tsx';
import { Slider } from './Slider.tsx';

export function BoidsControlPanel() {
  const [collapsed, setCollapsed] = useState(true);

  const { reset: resetAlignment } = useAlignmentPrincipleStore();
  const { reset: resetCohesion } = useCohesionPrincipleStore();
  const { reset: resetSeparation } = useSeparationPrincipleStore();
  const { reset: resetGeneral } = useGeneralSettingStore();

  const restoreDefaults = () => {
    resetSeparation();
    resetAlignment();
    resetCohesion();
    resetGeneral();
  };

  return (
    <div className="w-80 max-h-full flex flex-col rounded-2xl bg-white/10 p-5 pr-3 shadow-2xl backdrop-blur-[5px]">
      <div className="mb-3 pl-1.5 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Boids Control Panel
          </div>
          <div className="text-xs text-slate-600">
            Adjust behaviour parameters of the boids
          </div>
        </div>

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex rounded-full border border-slate-300/50 bg-white/70 p-1.5 hover:cursor-pointer"
        >
          <IconChevronDown
            size={18}
            stroke={1.75}
            className={clsx(
              'transition-transform duration-200',
              collapsed && 'rotate-180',
            )}
          />
        </button>
      </div>

      <div
        className={clsx(
          'transition-transform duration-200 overflow-y-auto pr-2',
          collapsed ? 'max-h-0 opacity-0' : 'max-h-auto opacity-100',
        )}
      >
        <div className="mb-6 rounded-xl b bg-indigo-50/40 px-3 py-2 text-xs text-slate-700">
          Press 'spacebar' to toggle danger mode
        </div>

        <GeneralSettingsPanel />
        <ForceSettingsPanel />

        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
          <span>Restores default behaviour settings</span>
          <button
            type="button"
            onClick={restoreDefaults}
            className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:cursor-pointer"
          >
            Restore defaults
          </button>
        </div>
      </div>
    </div>
  );
}

function GeneralSettingsPanel() {
  const { numberOfBoids, setNumberOfBoids } = useGeneralSettingStore();

  return (
    <Section separator>
      <SectionTitle>General settings</SectionTitle>

      <Slider
        label="Number of boids"
        min={0}
        max={2000}
        value={numberOfBoids}
        onChange={setNumberOfBoids}
        valueDisplay={String(numberOfBoids)}
      />
    </Section>
  );
}

function ForceSettingsPanel() {
  const {
    range: alignmentRange,
    influence: alignmentInfluence,
    setRange: setAlignmentRange,
    setInfluence: setAlignmentInfluence,
  } = useAlignmentPrincipleStore();

  const {
    range: cohesionRange,
    influence: cohesionInfluence,
    setRange: setCohesionRange,
    setInfluence: setCohesionInfluence,
  } = useCohesionPrincipleStore();

  const {
    range: separationRange,
    influence: separationInfluence,
    setRange: setSeparationRange,
    setInfluence: setSeparationInfluence,
  } = useSeparationPrincipleStore();

  const settings = [
    {
      title: 'Separation principle',
      range: separationRange,
      setRange: setSeparationRange,
      influence: separationInfluence,
      setInfluence: setSeparationInfluence,
    },
    {
      title: 'Alignment principle',
      range: alignmentRange,
      setRange: setAlignmentRange,
      influence: alignmentInfluence,
      setInfluence: setAlignmentInfluence,
    },
    {
      title: 'Cohesion principle',
      range: cohesionRange,
      setRange: setCohesionRange,
      influence: cohesionInfluence,
      setInfluence: setCohesionInfluence,
    },
  ];

  return (
    <>
      {settings.map((item, i) => (
        <Section key={item.title} separator={i < settings.length - 1}>
          <SectionTitle>{item.title}</SectionTitle>

          <Slider
            label="Range"
            min={0}
            max={100}
            value={item.range}
            onChange={item.setRange}
            valueDisplay={String(item.range)}
          />

          <Slider
            label="Influence"
            min={0}
            max={1}
            step={0.01}
            value={item.influence}
            onChange={item.setInfluence}
            valueDisplay={item.influence.toFixed(2)}
          />
        </Section>
      ))}
    </>
  );
}
