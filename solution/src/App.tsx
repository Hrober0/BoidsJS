import BoidsCanvas from './Boids/BoidsCanvas.tsx';
import { BoidsControlPanel } from './Boids/control/component/BoidsControlPanel.tsx';

export default function App() {
  return (
    <div className={'w-screen h-screen relative'}>
      <div className={'absolute w-full h-full -z-10 bg-cyan-200'} />
      <BoidsCanvas />
      <div className="fixed top-4 bottom-4 left-4 max-h-full">
        <BoidsControlPanel />
      </div>
    </div>
  );
}
