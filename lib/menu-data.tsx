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
        title: "거미 크레인",
        href: "/equipment/spider",
        description: "Jekko · Hoeflon · BEFARD · UNIC · MAEDA"
      },
      {
        id: "spider-grapple",
        title: "집게 거미크레인",
        href: "/equipment/spider-grapple",
        description: "Jekko · Hoeflon"
      },
      {
        id: "spider-glass",
        title: "유리 흡착기 거미크레인",
        href: "/equipment/spider-glass",
        description: "Jekko"
      },
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
        title: "기타 장비",
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
    id: "about",
    title: "대명거미크레인 소개",
    href: "/about"
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
        title: "Spider lifts",
        href: "https://www.platformbasket.com/en/spider-lifts/",
        target: "_blank",
        description: "Tracked spider lifts, tracked self-propelled spider lifts with basket lift. Vertical lift."
      },
      {
        id: "rail-boom-lifts",
        title: "Rail boom lifts",
        href: "https://www.platformbasket.com/en/rail-boom-lifts/",
        target: "_blank",
        description: "Road/rail self-propelled boom lifts"
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
