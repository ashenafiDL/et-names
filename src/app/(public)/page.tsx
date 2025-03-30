import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <section className="relative z-10 container px-4 py-12 md:py-24">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            ET-NAMES
          </h1>
          <p className="text-muted-foreground max-w-[600px] text-xl text-balance">
            Discover and share beautiful Ethiopian names and their meanings.
          </p>
        </div>

        <div className="mt-16 flex flex-col justify-center gap-4 md:flex-row">
          <Button asChild size="lg" className="px-8">
            <Link href="/submit">Add a Name</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/browse">Browse Names</Link>
          </Button>
        </div>
      </section>
    </Container>
  );
}
