export type TServiceCategory = {
  id: string;
  name: string;
  is_Active: boolean;

  parent_categoryId: string;
};
export type TParentcategory = {
  id: string;
  name: string;
  is_Active: boolean;
};

type TAvailability = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type TService = {
  title: string;
  description: string;
  area: string;
  price: string;
  parentCategory: string;
  category: string;
  availabilities: TAvailability[];
};
