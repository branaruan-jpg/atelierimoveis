import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PropertySearch } from '@/components/sections/PropertySearch';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { BrandManifesto } from '@/components/sections/BrandManifesto';
import { LifestyleCategories } from '@/components/sections/LifestyleCategories';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-marfim">
      <Header />
      <main>
        <Hero />
        <PropertySearch />
        <FeaturedProperties />
        <BrandManifesto />
        <LifestyleCategories />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
