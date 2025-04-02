import Link from "next/link";
import Container from "./container";

const NAV_ITEMS = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/browse", label: "Browse Names" },
      { href: "/submit", label: "Submit a Name" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#faq", label: "FAQ" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="border-t">
      <Container>
        <footer className="py-8 md:py-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">ET-NAMES</h3>
              <p className="text-muted-foreground max-w-xs text-sm">
                A community-driven Ethiopian name repository celebrating the
                rich cultural heritage of Ethiopia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-2 md:gap-24">
              {NAV_ITEMS.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h4 className="text-sm font-medium">{section.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-muted-foreground text-center text-sm">
              © 2025 ET-NAMES. All rights reserved.
            </p>
          </div>
        </footer>
      </Container>
    </div>
  );
}
