export type sidebarMenu = {
    items: {
      title?: string;
      name: string,
      iconClass: string,
      active: boolean,
      url?: string;
      levelTwo?: { 
        name: string, 
        url: string,
        levelThree?: {
          title?: string,
          name: string, 
          url: string,
        }[]
      }[]
    }[]
  };