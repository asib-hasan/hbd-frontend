import { ReactNode } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  stats?: { label: string; value: string }[];
  children?: ReactNode;
}

const PageHeader = ({ title, description, breadcrumbs, stats, children }: PageHeaderProps) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero-subtle" />
      <div className="absolute inset-0 bg-hero-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm mb-6 animate-fade-up">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                {crumb.href ? (
                  <Link to={crumb.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up stagger-1">
            {title.includes("Best") ? (
              <>
                {title.split("Best")[0]}
                <span className="text-gradient">Best</span>
                {title.split("Best")[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl animate-fade-up stagger-2">
            {description}
          </p>

          {/* Stats */}
          {stats && (
            <div className="flex flex-wrap gap-8 mt-8 animate-fade-up stagger-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary font-display">{stat.value}</span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
