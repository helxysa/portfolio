import Header from '@/app/componentes/Nav';
import Hero from '@/app/componentes/Hero';
import Projetos from '@/app/componentes/Projetos';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Projetos />
    </main>
  );
}