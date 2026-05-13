import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">TR</span>
            </span>
            <span className="text-text-primary font-bold text-lg">TRID</span>
          </div>
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} TRID. Manufacturing as a Service.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-text-muted hover:text-text-secondary text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
