
export interface WebHeroSlide {
    id: string;
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    titleColor?: string;
    subtitleColor?: string;
    descriptionColor?: string;
    titleShadowColor?: string;
    order: number;
}

export interface WebSocialInfo {
    phone?: string;
    email?: string;
    address?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
}

export interface Category {
    id: number | string;
    title: string;
    description?: string;
    iconName?: string;
    webIcon?: string;
    order?: number;
    isActive?: boolean;
}

export interface SubCategory {
    id: number | string;
    categoryId: number;
    title: string;
    description?: string;
    imageUrl?: string;
    pageDesign?: string;
    order: number;
    isActive: boolean;
}

export interface Place {
    id: number;
    title: string;
    slug?: string;
    pic_url?: string;
    back_pic_url?: string;
    description?: string;
    source?: string; // Front page title
    rating?: number;
    isActive: boolean;
    categoryId?: number;
    subCategoryId?: number;

    // Dynamic Icon/Info Cards
    icon1?: string; title1?: string; info1?: string;
    icon2?: string; title2?: string; info2?: string;
    icon3?: string; title3?: string; info3?: string;
    icon4?: string; title4?: string; info4?: string;

    // Panels
    panel1_title?: string; panel1?: string;
    panel2_title?: string; panel2?: string;
    panel3_title?: string; panel3?: string;
    panel4_title?: string; panel4?: string;
    panel5_title?: string;

    // Colored Panels
    panel_col_title?: string; panel_col?: string;
    panel_col_title2?: string; panel_col2?: string;

    // Area Fields
    area1?: string; area2?: string; area3?: string; area4?: string; area5?: string;
    area6?: string; area7?: string; area8?: string; area9?: string; area10?: string;

    address?: string;
    website?: string;
}

export interface FoodPlace {
    id: number;
    title: string;
    subtitle?: string; // Front page title for food
    imageUrl?: string;
    backImageUrl?: string;
    rating?: number;
    isActive: boolean;
    subCategoryId: number;

    // Story/Content
    storyTitle?: string;
    frontContent?: string;
    backContent?: string;

    // Contact & Info
    phone?: string;
    address?: string;
    website?: string;
    badge?: string;
    features?: string; // Comma separated string

    // Hours
    hoursEveryday?: string;
    hoursMon?: string;
    hoursTue?: string;
    hoursWed?: string;
    hoursThu?: string;
    hoursFri?: string;
    hoursSat?: string;
    hoursSun?: string;

    // Menu (Up to 10 items)
    menuItem1?: string; menuDesc1?: string; menuPrice1?: string;
    menuItem2?: string; menuDesc2?: string; menuPrice2?: string;
    menuItem3?: string; menuDesc3?: string; menuPrice3?: string;
    menuItem4?: string; menuDesc4?: string; menuPrice4?: string;
    menuItem5?: string; menuDesc5?: string; menuPrice5?: string;
    menuItem6?: string; menuDesc6?: string; menuPrice6?: string;
    menuItem7?: string; menuDesc7?: string; menuPrice7?: string;
    menuItem8?: string; menuDesc8?: string; menuPrice8?: string;
    menuItem9?: string; menuDesc9?: string; menuPrice9?: string;
    menuItem10?: string; menuDesc10?: string; menuPrice10?: string;

    // Extra fields
    field1?: string; field2?: string; field3?: string; field4?: string; field5?: string;
}
