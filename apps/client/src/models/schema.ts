import {
  BookingViewPagedCollection,
  RecentlyViewedView,
  ReviewViewPagedCollection,
  SavedServiceViewPagedCollection,
  ServiceView,
  ServiceViewPagedCollection,
  StudioView,
  UserView,
} from "src/services";

export interface ICustomerHome {
  popularStudios?: ServiceViewPagedCollection;
  singleService?: ServiceView;
  ratings?: ReviewViewPagedCollection;
  id?: string;
  recentlyViewed?: RecentlyViewedView[];
  allService?: ServiceViewPagedCollection;
  location?: any;
  studiosNearMe?: ServiceViewPagedCollection;
  studios?: ServiceViewPagedCollection;
}
export interface IPopularStudios {
  service?: ServiceView;
  isSaved?: boolean;
  loading?: any;
  del?: () => void;
  id?: string | undefined | null;
}

export interface ISingleCategory {
  categoryId?: string;
  // singleService?: ServiceView;
  singlecategory?: ServiceViewPagedCollection;
  recentlyViewed?: RecentlyViewedView[];
}

export interface IStudios {
  savedStudios?: SavedServiceViewPagedCollection;
  studioForYou?: ServiceViewPagedCollection;
  service?: StudioView;
}

export interface IProfileProps {
  user: UserView;
}

export interface ISingleStudioProps {
  singleStudio: StudioView;
}
export interface IBookingsProps {
  bookings: BookingViewPagedCollection;
}
