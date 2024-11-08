
import Header from '@/app/componentes/Nav';
import Hero from '@/app/componentes/Hero';
import Projetos from '@/app/componentes/Projetos';
import Historico from '@/app/componentes/Historico';
import Contato from '@/app/componentes/Contato';

export default function Home() {
  

  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Projetos />
      <Historico />
      <Contato />
    </main>
  );
}