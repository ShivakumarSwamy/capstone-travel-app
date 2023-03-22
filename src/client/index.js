import { updateStartEndDates, planTravel, planTravelOnEnterKey } from "./js/app";

import "./styles/styles.scss";

document.addEventListener('DOMContentLoaded', updateStartEndDates);
document.querySelector("#search").addEventListener("click", planTravel);
document.querySelector("#place").addEventListener("keydown", planTravelOnEnterKey);
document.querySelector("#startDate").addEventListener("keydown", planTravelOnEnterKey);
document.querySelector("#endDate").addEventListener("keydown", planTravelOnEnterKey);

