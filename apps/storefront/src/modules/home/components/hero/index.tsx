import { Button, Heading } from "@modules/common/components/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden border-b border-ui-border-base bg-[url('/images/pickleball-court-hero.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />
      <div className="content-container relative z-10 flex min-h-[70vh] flex-col items-center justify-center gap-7 py-20 text-center">
        <div className="max-w-3xl">
          <Heading
            level="h1"
            className="text-4xl font-semibold leading-tight text-white small:text-6xl"
          >
            Cambrian Pickleball Store
          </Heading>
          <p className="mt-4 text-base text-white/90 small:text-xl">
            Everything you need to play your best game.
          </p>
        </div>
        <LocalizedClientLink href="/store">
          <Button variant="secondary">Shop the collection</Button>
        </LocalizedClientLink>
      </div>
    </section>
  );
};

export default Hero;
