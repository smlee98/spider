"use client";

import { Badge } from "@/components/ui/badge";
import { CustomOverlayMap, Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <Map
      center={{ lat: 37.2261218415906, lng: 127.429142559335 }}
      level={2}
      zoomable={false}
      draggable={false}
      style={{ width: "100%", height: "100%" }}
    >
      <CustomOverlayMap position={{ lat: 37.2261218415906, lng: 127.429142559335 }}>
        <Badge className="text-sm">경기도 이천시 호법면 후안리 100-11</Badge>
      </CustomOverlayMap>
      <MapTypeControl position="TOPRIGHT" />
      <ZoomControl position="RIGHT" />
    </Map>
  );
}
