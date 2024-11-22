import Header from '@/app/componentes/Nav';
import Hero from '@/app/componentes/Hero';
import Projetos from '@/app/componentes/Projects';
import Historico from '@/app/componentes/History';
import Contato from '@/app/componentes/Contact';
import { CursorProvider } from './ContextCursor/ContextCursor';

export default function Home() {
  return (
    <CursorProvider>
      <main className="overflow-x-hidden">
        <Header />
        <Hero />
        <Projetos />
        <Historico />
        <Contato />
      </main>
    </CursorProvider>
  );
}