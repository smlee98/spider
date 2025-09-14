import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import { boomLift } from "./constants";

export default function BoomLiftPage() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground text-4xl font-black md:text-5xl">굴절식 고소작업대</h1>
        <Tabs defaultValue={boomLift[0].id} className="w-full">
          <TabsList>
            {boomLift.map((brand) => (
              <TabsTrigger key={brand.id} value={brand.id}>
                {brand.brandName}
              </TabsTrigger>
            ))}
          </TabsList>
          {boomLift.map((brand) => (
            <TabsContent key={brand.id} value={brand.id}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {brand.equipments.map((equipment) => (
                  <Link
                    key={equipment.model}
                    href={`/equipment/boom-lift/${brand.brandName.toLowerCase()}/${equipment.model.toLowerCase()}`}
                    className="group"
                  >
                    <Card className="gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
                      <CardContent className="bg-muted flex aspect-square items-center justify-center">
                        <ImageOff className="text-muted-foreground size-8" />
                      </CardContent>
                      <CardHeader className="gap-0 border-t py-6">
                        <CardTitle>{equipment.model}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Container>
  );
}
