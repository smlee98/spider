import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { spider } from "./constants";

export default function SpiderPage() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground text-4xl font-black md:text-5xl">거미 크레인</h1>
        <Tabs defaultValue={spider[0].id} className="w-full">
          <TabsList>
            {spider.map((brand) => (
              <TabsTrigger key={brand.id} value={brand.id}>
                {brand.brandName}
              </TabsTrigger>
            ))}
          </TabsList>
          {spider.map((brand) => (
            <TabsContent key={brand.id} value={brand.id}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {brand.equipments.map((equipment) => (
                  <Link
                    key={equipment.modelName}
                    href={`/equipment/spider/${brand.brandName.toLowerCase()}/${equipment.modelName.toLowerCase()}`}
                    className="group"
                  >
                    <Card className="gap-0 overflow-hidden py-0 transition-all group-hover:ring-2">
                      <CardContent className="bg-muted flex aspect-square items-center justify-center">
                        <picture>
                          <img
                            src={`/equipment/spider/${brand.brandName}/${equipment.modelName}/${equipment.modelName}.png`}
                            alt={`${brand.brandName}/${equipment.modelName}`}
                            className="h-auto max-h-80 w-full max-w-full md:max-h-60"
                          />
                        </picture>
                      </CardContent>
                      <CardHeader className="gap-0 border-t py-6">
                        <CardTitle>{equipment.modelName}</CardTitle>
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
