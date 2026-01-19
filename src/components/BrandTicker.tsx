import googleLogo from '@/assets/logos/google.png';
import nestleLogo from '@/assets/logos/nestle.png';
import servicenowLogo from '@/assets/logos/servicenow.png';
import betseyJohnsonLogo from '@/assets/logos/betsey-johnson.png';
import goodMorningAmericaLogo from '@/assets/logos/good-morning-america.png';
import wnbaLogo from '@/assets/logos/wnba.svg';
import netflixLogo from '@/assets/logos/netflix.png';
import spectrumNewsLogo from '@/assets/logos/spectrum-news.svg';
import theTradeDeskLogo from '@/assets/logos/the-trade-desk.png';

const brands = [
  { name: 'Google', logo: googleLogo, isDark: false },
  { name: 'Netflix', logo: netflixLogo, isDark: false },
  { name: 'Nestlé', logo: nestleLogo, isDark: true },
  { name: 'ServiceNow', logo: servicenowLogo, isDark: true },
  { name: 'The Trade Desk', logo: theTradeDeskLogo, isDark: true },
  { name: 'Betsey Johnson', logo: betseyJohnsonLogo, isDark: true },
  { name: 'Good Morning America', logo: goodMorningAmericaLogo, isDark: false },
  { name: 'WNBA', logo: wnbaLogo, isDark: false },
  { name: 'Spectrum News', logo: spectrumNewsLogo, isDark: false },
];

const BrandTicker = () => {
  return (
    <section className="py-16 overflow-hidden border-y border-border/30 bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Trusted by Industry Leaders
        </p>
      </div>
      <div className="flex">
        <div className="ticker flex items-center gap-20 whitespace-nowrap">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[120px]"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
                decoding="async"
                className={`h-10 md:h-12 w-auto max-w-[160px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 ${brand.isDark ? 'brightness-0 invert' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;
