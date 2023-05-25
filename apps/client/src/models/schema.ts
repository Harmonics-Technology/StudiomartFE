import { ReviewViewPagedCollection } from "./../../../vendor/src/services/models/ReviewViewPagedCollection";
import { ServiceView, ServiceViewPagedCollection } from "src/services";

export interface ICustomerHome {
  popularStudios?: ServiceViewPagedCollection;
  singleService?: ServiceView;
  ratings?: ReviewViewPagedCollection;
}
export interface IPopularStudios {
  service?: ServiceView;
}
