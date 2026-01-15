const brands = [
  'Microsoft',
  'Google',
  'Nike',
  'Adidas',
  'Meta',
  'Amazon',
  'Apple',
  'Spotify',
  'Netflix',
  'Tesla',
  'Adobe',
  'Salesforce',
];

const BrandTicker = () => {
  return (
    <section className="py-12 overflow-hidden border-y border-border/30 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="flex">
        <div className="ticker flex items-center gap-16 whitespace-nowrap">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-primary opacity-20" />
              <span className="font-display font-semibold text-lg tracking-wide uppercase">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;
