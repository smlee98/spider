"use client";

import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Script from "next/script";
import { CustomOverlayMap, Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";

const API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export default function AboutPage() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-4 leading-relaxed">
            <h4 className="flex flex-col text-2xl">
              <span className="font-semibold">안녕하십니까.</span>
              <span>대명거미크레인을 방문해주신 여러분께</span>
              <span>진심으로 감사드립니다.</span>
            </h4>
            <div className="flex flex-col gap-6 text-balance break-keep">
              <p>철저한 안전교육으로 사고 예방에 최선을 다하는 (주)대명거미크레인입니다.</p>
              <p>저희 대명거미크레인 홈페이지를 방문해 주셔서 대단히 감사합니다.</p>
              <p>
                저희 대명거미크레인는 다년간 크레인 임대 업계에 몸담고 축적된 노하우를 바탕으로 고객 여러분께 조금이나마
                보탬이 되고자 오프라인 시장에서 보다 발전한 온라인 시장으로의 진출을위해 홈페이지를 오픈하게 되었습니다.
              </p>
              <p>
                오프라인의 풍부한 경험을 바탕으로 온라인이라는 빠른 장점을 가진 홈페이지와 결합으로 더욱 발전된 모습을
                보여드리도록 최선을 다하겠습니다.
              </p>
              <p>
                저희 대명거미크레인에서는 국내외 각종 크레인 임대 업무를 하고 있으며, 보다 빠른 정보화 시대에 발맞춰
                고객분들이 원하시는 정보로 공정한 거래가 이루어질 수 있도록 최선을 다하며 고객 여러분과 함께 커나갈 수
                있는 업체가 되겠습니다.
              </p>
              <p>
                기타 문의사항이 있으시면 언제든 전화주시기 바라며 다시한번 저희 대명거미크레인 홈페이지를 방문해주셔서
                감사합니다.
              </p>
            </div>
          </div>
          <Image src="/company/about/img001.png" width={470} height={470} alt="about" />
        </div>
      </Container>
      <Separator />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <div className="h-[560px] w-full">
        <Map
          id="map"
          className="size-full"
          center={{ lat: 37.4854793, lng: 127.0311841 }} // 지도의 중심 좌표
          level={2} // 지도 확대 레벨
          zoomable={false}
          draggable={false}
        >
          <CustomOverlayMap position={{ lat: 37.4854793, lng: 127.0311841 }}>
            <Badge className="text-sm">서울 서초구 남부순환로347길 23</Badge>
          </CustomOverlayMap>
          <MapTypeControl position="TOPRIGHT" />
          <ZoomControl position="RIGHT" />
        </Map>
      </div>
    </>
  );
}
