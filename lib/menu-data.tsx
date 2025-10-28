export interface MenuIcon {
  type: "image" | "component";
  src?: string;
  alt?: string;
  className?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  href?: string;
  target?: "_blank" | "_self";
  description?: string;
  icon?: MenuIcon;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    id: "equipment",
    title: "보유장비",
    children: [
      {
        id: "spider",
        title: "거미크레인",
        href: "/equipment/spider",
        description: "Jekko · Hoeflon · BEFARD · UNIC · MAEDA"
      },
      // {
      //   id: "jib",
      //   title: "지브 거미크레인",
      //   href: "/equipment/jib",
      //   description: "Jekko · Hoeflon · UNIC"
      // },
      // {
      //   id: "grapple",
      //   title: "집게 거미크레인",
      //   href: "/equipment/grapple",
      //   description: "Jekko · Hoeflon"
      // },
      // {
      //   id: "glass",
      //   title: "유리 흡착기 거미크레인",
      //   href: "/equipment/glass",
      //   description: "Jekko"
      // },
      {
        id: "boom-lift",
        title: "굴절식 고소작업대",
        href: "/equipment/boom-lift",
        description: "Cela"
      },
      {
        id: "crawler",
        title: "크롤러 크레인",
        href: "/equipment/crawler",
        description: "MAEDA · Kobelco · Jekko"
      },
      {
        id: "etc",
        title: "기타 장비 (집게, 유리흡착기 등)",
        href: "/equipment/etc"
      }
    ]
  },
  {
    id: "gallery",
    title: "현장사진",
    href: "/gallery"
  },
  {
    id: "company",
    title: "회사소개",
    children: [
      {
        id: "about",
        title: "대명거미크레인 소개",
        href: "/company/about"
      },
      {
        id: "milestone",
        title: "연혁",
        href: "/company/milestone"
      }
    ]
  },
  {
    id: "platform-basket",
    title: "Platform Basket",
    icon: {
      type: "image",
      src: "/platform-basket.png",
      alt: "platform-basket",
      className: "h-6 w-auto"
    },
    children: [
      {
        id: "spider-lifts",
        title: "거미형 리프트",
        href: "https://www.platformbasket.com/en/spider-lifts/",
        target: "_blank",
        description: "거미형 트랙식 굴절 리프트"
      },
      {
        id: "rail-boom-lifts",
        title: "철도 리프트",
        href: "https://www.platformbasket.com/en/rail-boom-lifts/",
        target: "_blank",
        description: "도로/철도 겸용 자가 추진식 리프트"
      }
    ]
  }
];

export const getMenuById = (id: string): MenuItem | undefined => {
  const findInMenu = (items: MenuItem[]): MenuItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findInMenu(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findInMenu(menuData);
};

export const isDropdownMenu = (item: MenuItem): boolean => {
  return !!(item.children && item.children.length > 0);
};

export const isSingleLink = (item: MenuItem): boolean => {
  return !!item.href && !item.children;
};
