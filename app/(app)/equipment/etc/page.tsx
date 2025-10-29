"use client";

import { equipments } from "@/app/(app)/equipment/etc/constants";
import Container from "@/components/layout/container";
import { Card } from "@/components/ui/card";
interface Equipment {
  equipment: {
    category: string;
    manufacturer: string;
    model: string;
    image: string;
    specs: {
      label: string;
      value: string;
    }[];
  };
}

export default function SpiderPage() {
  const EquipmentCard = ({ equipment }: Equipment) => {
    return (
      <Card className="overflow-hidden py-0">
        <div className="grid gap-x-6 md:grid-cols-[400px_1fr] lg:grid-cols-[500px_1fr]">
          {/* Image Section */}
          <div className="bg-secondary relative md:min-h-[400px]">
            <picture className="">
              <img
                src={`/equipment/etc/${equipment.image}.png`}
                alt={`${equipment.manufacturer} ${equipment.model}`}
                className="object-cover"
              />
            </picture>
          </div>

          {/* Specifications Section */}
          <div className="flex flex-col gap-6 p-6 lg:p-8">
            <div>
              <div className="bg-primary text-primary-foreground mb-2 inline-block rounded-md px-3 py-1 text-sm font-medium">
                {equipment.category}
              </div>
              <h2 className="text-foreground text-2xl font-bold lg:text-3xl">{equipment.manufacturer}</h2>
              <p className="text-muted-foreground mt-1 text-xl">{equipment.model}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {equipment.specs.map((spec, index) => (
                <div key={index} className="border-border flex flex-col gap-1 border-l-2 pl-4">
                  <dt className="text-muted-foreground text-sm font-medium">{spec.label}</dt>
                  <dd className="text-foreground text-base font-semibold">{spec.value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground text-3xl font-black md:text-4xl">기타 장비 (집게, 유리흡착기 등)</h1>
        <div className="grid gap-8 md:gap-10">
          {equipments.map((equipment, index) => (
            <EquipmentCard key={index} equipment={equipment} />
          ))}
        </div>
      </div>
    </Container>
  );
}
