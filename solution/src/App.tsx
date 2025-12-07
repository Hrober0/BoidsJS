import BoidsCanvas from './Boids/BoidsCanvas.tsx';

export default function App() {
  return (
    <div className={'w-screen h-screen relative'}>
      <div className={'absolute w-full h-full -z-10 bg-cyan-200'} />
      <BoidsCanvas />
    </div>
  );
}
