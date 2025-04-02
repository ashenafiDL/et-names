import { getRecentlyAdded } from "@/actions/names/actions";
import Link from "next/link";
import Container from "./container";
import NameCard from "./name-card";
import { Button } from "./ui/button";

export default async function RecentlyAddedNames() {
  const recentlyAdded = await getRecentlyAdded();

  if (recentlyAdded.length === 0) return;

  return (
    <section className="bg-muted/50 py-16">
      <Container>
        <div>
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Recently Added Names
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentlyAdded.map((name: any, index) => {
              return (
                <NameCard
                  key={index}
                  name={name.name}
                  nicknames={name.nicknames}
                  gender={name.gender}
                  meaning={name.meaning || ""}
                  additionalInfo={name.additionalInfo || ""}
                />
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild>
              <Link href="/browse">View All Names</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
