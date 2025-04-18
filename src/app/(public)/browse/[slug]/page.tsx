import Container from "@/components/container";
import NameActions from "@/components/name-actions";
import SharePopup from "@/components/share-popup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCustomDate } from "@/lib/utils/formatters";
import { NameWithNicknames, tParams } from "@/lib/utils/types";
import { Calendar, Clock, Heart } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: tParams;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const decoded = decodeURIComponent(slug[1]);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/names?name=${decoded}`,
    );
    if (!res.ok) throw new Error("Name not found");

    const { name, meaning } = await res.json();

    return {
      openGraph: {
        title: `et-names – ${name}`,
        description: meaning
          ? `${meaning} – Collection of Ethiopian names.`
          : "Collection of Ethiopian names.",
        type: "profile",
        siteName: "ET-NAMES",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: `et-names – ${name}`,
        description: meaning
          ? `${meaning} – Collection of Ethiopian names.`
          : "Collection of Ethiopian names.",
      },
    };
  } catch {
    return {
      openGraph: {
        title: "et-names",
        description: "Collection of Ethiopian names.",
      },
    };
  }
}

export default async function Name(props: { params: tParams }) {
  const { slug } = await props.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/names?name=${slug}`,
  );

  if (!res.ok) notFound();

  const {
    name,
    gender,
    meaning,
    additionalInfo,
    nicknames,
    _count,
    addedBy,
    createdAt,
    updatedAt,
  }: NameWithNicknames = await res.json();

  return (
    <Container>
      <div className="py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mb-2">
                <Badge>{gender}</Badge>
              </div>

              <h1 className="text-4xl font-bold md:text-5xl">{name}</h1>
            </CardHeader>

            <CardContent className="space-y-6 text-center">
              <p className="text-muted-foreground mt-2 text-xl">{meaning}</p>

              <div>{additionalInfo}</div>

              <div className="flex flex-row items-center justify-center gap-2">
                {nicknames.map((nicknameObj, index) => (
                  <Badge variant="secondary" key={index} className="text-lg">
                    {nicknameObj.nickname.nickname}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flow-row mt-4 flex justify-center">
              <NameActions />
            </CardFooter>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="details">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>

            {/* Details tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Name Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Added by
                      </h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-4">
                          <AvatarImage
                            src={addedBy?.image || ""}
                            alt={addedBy?.name}
                          />
                          <AvatarFallback className="text-sm">
                            {addedBy?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{addedBy?.name}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Added on
                      </h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground size-4" />
                        <span>{formatCustomDate(createdAt)}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Last updated
                      </h3>
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground size-4" />
                        <span>{formatCustomDate(updatedAt)}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                        Liked by
                      </h3>
                      <div className="flex items-center gap-2">
                        <Heart className="text-primary fill-primary size-4" />
                        <span>{_count?.likes || 0} people</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Share tab */}
            <TabsContent value="share">
              <Card>
                <CardHeader>
                  <CardTitle>Share this name</CardTitle>
                  <CardDescription>
                    Share this beautiful Ethiopian name with friends and family.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SharePopup name={name} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}
