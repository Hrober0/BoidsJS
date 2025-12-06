import BoidsBackground from './Boids/BoidsBackground.tsx';

export default function App() {
  return (
    <div className={'w-screen h-screen relative'}>
      <div className={'absolute w-full h-full -z-10 bg-zinc-700'}/>
      <BoidsBackground />
    </div>
  );
}
