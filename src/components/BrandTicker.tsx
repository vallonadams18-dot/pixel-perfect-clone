const brands = [
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'The Trade Desk', domain: 'thetradedesk.com' },
  { name: 'Givaudan', domain: 'givaudan.com' },
  { name: 'Botify', domain: 'botify.com' },
  { name: 'NYCWFF', domain: 'nycwff.org' },
  { name: 'Crown Royal', domain: 'crownroyal.com' },
  { name: '1199SEIU', domain: '1199seiu.org' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Adidas', domain: 'adidas.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Spotify', domain: 'spotify.com' },
  { name: 'Tesla', domain: 'tesla.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
];

const BrandTicker = () => {
  return (
    <section className="py-12 overflow-hidden border-y border-border/30 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="flex">
        <div className="ticker flex items-center gap-16 whitespace-nowrap">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              <img
                src={`https://logo.clearbit.com/${brand.domain}`}
                alt={`${brand.name} logo`}
                className="w-8 h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  // Fallback to placeholder if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-8 h-8 rounded-lg bg-gradient-primary opacity-20" />
              <span className="font-display font-semibold text-lg tracking-wide uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;