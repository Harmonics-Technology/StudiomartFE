import { ReviewViewPagedCollection } from "./../../../vendor/src/services/models/ReviewViewPagedCollection";
import { ServiceView, ServiceViewPagedCollection } from "src/services";

export interface ICustomerHome {
  popularStudios?: ServiceViewPagedCollection;
  singleService?: ServiceView;
  ratings?: ReviewViewPagedCollection;
  id?: string;
}
export interface IPopularStudios {
  service?: ServiceView;
}

export interface ISingleCategory {
  categoryId?: string;
  // singleService?: ServiceView;
  singlecategory?: ServiceViewPagedCollection;
}

export interface IStudios {
  singlecategory?: ServiceViewPagedCollection;
}

