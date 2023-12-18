import { SearchBox } from './Components/utils/SearchBox';
import { GlobalSearch } from './Components/utils/GlobalSearch';
import { Loader } from './Components/utils/Loader';
import { SearchInput } from './Components/utils/SearchInput';
import { BookingsBtn } from "./Components/utils/BookingsBtn";
import { ResponseBox, ResponseBoxLarge } from "./Components/utils/ResponseBox";
import { ProcedureCard } from "./Components/utils/ProcedureCard";
import { useNonInitialEffect } from "./Components/utils/useNonInitialEffect";
import { NotFound } from "./Components/utils/NotFound";
import { GPlacesAutoComplete } from "./Components/utils/GPlacesAutoComplete";
import { ImageLightBox } from "./Components/utils/ImageLightBox";
import useComponentVisible from "./Components/utils/useComponentVisible";
import { getReviewSummary } from "./Components/utils/RatingSummary";
import useWindowSize from "./Components/utils/useWindowSize";
import { getDeviceFromUserAgent } from "./Components/utils/GetDeviceFromUser";
import { MenuDropdown } from "./Components/utils/MenuDropdown";
import { SelectrixBox } from "./Components/utils/SelectrixBox";
import { CurrencyField } from "./Components/utils/CurrencyField";
import { InfoBox } from "./Components/utils/InfoBox";
import { FilterPagingOptions } from "./Components/utils/FilterPagingOption";
import { SideText } from "./Components/utils/SideText";
import SubmitButton from "./Components/utils/SubmitButton";
import Rating from "./Components/utils/Rating";
import { PrimaryTextarea } from "./Components/utils/PrimaryTextArea";
import PrimarySelect from "./Components/utils/PrimarySelect";
import PrimaryInput from "./Components/utils/PrimaryInput";
import { PrimaryDate } from "./Components/utils/PrimaryDate";
import ModalWrapper from "./Components/utils/ModalWrapper";
import MenuItem from "./Components/utils/MenuItem";
import { LoginTypeBtn } from "./Components/utils/LoginTypeBtn";
import Harmburger from "./Components/utils/Harmburger";
import DrawerWrapper from "./Components/utils/DrawerWrapper";
import Cvcinputgroup from "./Components/utils/Cvcinputgroup";
import { CustomStepper } from "./Components/utils/CustomStepper";
import BookingText from "./Components/utils/BookingText";
import BackToPage from "./Components/utils/BackToPage";
import AlertBox from "./Components/utils/AlertBox";
import Filter from "./Components/utils/Filter";
import ExploreStudioCard from "./Components/HomePage/ExploreStudioCard";
import BookNowLink from "./Components/utils/BookNowLink";
import FilterLocation from "./Components/utils/FilterLocation";
import FilterStar from "./Components/utils/FilterStar";
import DisabledInput from "./Components/utils/DisabledInput";
import Pagination from "./Components/utils/Pagination";
import Naira from "./Components/utils/Naira";
import { Cur } from "./Components/utils/Naira";
import BookingFilters from "./Components/utils/BookingFilters";

import {
  TableData,
  TableHead,
  TableStatus,
  TableWithSub,
} from "./Components/utils/Tables";
import CustomTable from "./Components/utils/CustomTable";
import getUrlRoute from "./Components/Helper/GetUrl";
import CalculatePercent from "./Components/utils/CalculatePercent";
import { getCityAndState } from "./Components/utils/Geocode";
import {
  sliderSettings,
  sliderSets,
  slickImages,
} from "./Components/utils/SlickSettings";
import CustomCheckbox from "./Components/utils/CustomCheckbox";
import NotFoundPage from "./Components/utils/NotFoundPage";
import HandleSelectChat from "./Components/utils/HandleSelectChat";
import handleOtherErrors from './Components/utils/handleOtherErrors';

export {
  ExploreStudioCard,
  BookNowLink,
  Filter,
  AlertBox,
  BackToPage,
  BookingText,
  CustomStepper,
  Cvcinputgroup,
  DrawerWrapper,
  FilterLocation,
  FilterStar,
  Harmburger,
  LoginTypeBtn,
  MenuItem,
  ModalWrapper,
  PrimaryDate,
  PrimaryInput,
  PrimarySelect,
  PrimaryTextarea,
  Rating,
  SubmitButton,
  TableStatus,
  TableData,
  TableHead,
  TableWithSub,
  CustomTable,
  DisabledInput,
  SideText,
  FilterPagingOptions,
  Pagination,
  InfoBox,
  CurrencyField,
  Naira,
  Cur,
  SelectrixBox,
  MenuDropdown,
  getUrlRoute,
  getDeviceFromUserAgent,
  useWindowSize,
  getReviewSummary,
  CalculatePercent,
  useComponentVisible,
  ImageLightBox,
  GPlacesAutoComplete,
  getCityAndState,
  BookingFilters,
  NotFound,
  useNonInitialEffect,
  ProcedureCard,
  sliderSettings,
  sliderSets,
  CustomCheckbox,
  NotFoundPage,
  HandleSelectChat,
  ResponseBox,
  ResponseBoxLarge,
  BookingsBtn,
  slickImages,
  SearchInput,
  Loader,
  GlobalSearch,
  SearchBox,
  handleOtherErrors,
};
