import { ContactComponent, Container } from '@/components';
import { StatsSection } from '@/components/wrappers/StartSection';
import { HeroBanner } from '@/components/layout/DefaultLayout/Hero';
import {
  IndustrialIntro,
  ProjectCarousel,
  ProductShowcase,
  BlogSection,
  ServicesTabs,
} from '@/components/pages';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Container className="mt-16">
        <IndustrialIntro />
      </Container>

      <StatsSection />
      <Container>
        <ServicesTabs />
        <ProductShowcase />
        <ProjectCarousel />
        <BlogSection />
        <ContactComponent />
      </Container>
    </main>
  );
}
