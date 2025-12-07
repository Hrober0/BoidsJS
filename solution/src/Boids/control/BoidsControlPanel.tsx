import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useAlignmentPrincipleStore } from './store/alignmentPrincipleStore';
import { useCohesionPrincipleStore } from './store/cohesionPrincipleStore';
import { useSeparationPrincipleStore } from './store/SeparationPrincipleStore';

export function BoidsControlPanel() {
  const {
    range: alignmentRange,
    influence: alignmentInfluence,
    setRange: setAlignmentRange,
    setInfluence: setAlignmentInfluence,
    reset: resetAlignment,
  } = useAlignmentPrincipleStore();

  const {
    range: cohesionRange,
    influence: cohesionInfluence,
    setRange: setCohesionRange,
    setInfluence: setCohesionInfluence,
    reset: resetCohesion,
  } = useCohesionPrincipleStore();

  const {
    range: separationRange,
    influence: separationInfluence,
    setRange: setSeparationRange,
    setInfluence: setSeparationInfluence,
    reset: resetSeparation,
  } = useSeparationPrincipleStore();
  const [collapsed, setCollapsed] = useState(false);

  const ToggleCollapseIcon = collapsed ? IconChevronDown : IconChevronUp;

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

  const restoreDefaults = () => {
    resetSeparation();
    resetAlignment();
    resetCohesion();
  };

  return (
    <div className="w-80 rounded-2xl bg-white/10 p-5 shadow-2xl backdrop-blur-[2px]">
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
          <ToggleCollapseIcon size={18} stroke={1.75} />
        </button>
      </div>

      <div
        className={clsx(
          'transition-all duration-200 ease-out overflow-hidden',
          collapsed ? 'max-h-0 opacity-0' : 'max-h-[999px] opacity-100',
        )}
      >
        <div className="mb-6 rounded-xl b bg-indigo-50/40 px-3 py-2 text-xs text-slate-700">
          Press 'spacebar' to toggle danger mode
        </div>

        {settings.map((item, i) => (
          <section
            key={item.title}
            className={clsx(
              i < settings.length - 1 &&
                'mb-4 border-b-2 border-slate-100/60 pb-3',
            )}
          >
            <div className="mb-3 text-[14px] font-semibold text-slate-900">
              {item.title}
            </div>

            <div className="mb-2 flex flex-col">
              <label className="flex items-center justify-between text-[10px] text-slate-700">
                <span>Range</span>
                <span className="tabular-nums text-[10px] text-slate-500">
                  {item.range}
                </span>
              </label>

              <input
                type="range"
                min={0}
                max={100}
                value={item.range}
                onChange={(event) => item.setRange(Number(event.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between text-[10px] text-slate-700">
                <span>Influence</span>
                <span className="tabular-nums text-[10px] text-slate-500">
                  {item.influence.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={item.influence}
                onChange={(event) =>
                  item.setInfluence(Number(event.target.value))
                }
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>
          </section>
        ))}

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
