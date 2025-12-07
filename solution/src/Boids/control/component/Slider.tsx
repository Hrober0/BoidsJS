interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  valueDisplay?: string;
}

export function Slider({
  label,
  min,
  max,
  step,
  value,
  valueDisplay,
  onChange,
}: SliderProps) {
  return (
    <div className="mb-2 flex flex-col">
      <label className="flex items-center justify-between text-[10px] text-slate-700">
        <span>{label}</span>
        {valueDisplay && (
          <span className="tabular-nums text-[10px] text-slate-500">
            {valueDisplay}
          </span>
        )}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />

      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
