import placeholderImage from "../media/placeholder_image.jpg";

function updateStartEndDates() {
    const today = new Date();
    const minTodayDate = today.toISOString().split('T')[0];
    const todayWithDays = new Date();
    todayWithDays.setDate(today.getDate() + 182); // Add 6 months to set max date
    const maxDate = todayWithDays.toISOString().split('T')[0];

    const startDate = document.querySelector("#startDate");
    startDate.setAttribute("min", minTodayDate);
    startDate.setAttribute("max", maxDate);
    startDate.setAttribute("value", minTodayDate);

    const endDate = document.querySelector("#endDate");
    endDate.setAttribute("min", minTodayDate);
    endDate.setAttribute("max", maxDate);
    endDate.setAttribute("value", minTodayDate);
};

function planTravelOnEnterKey(event) {
  if (event.key === "Enter") {
    planTravel();
  }
}

function planTravel() {
  const placeName = document.querySelector("#place").value;

  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  internalPlanTravel(placeName, startDate, endDate)
  .then(data => updateUI(data));
}

async function internalPlanTravel(placeName, startDate, endDate) {
  const response = await fetch("http://localhost:3000/v1/planTravel", {
                          method: "POST",
                          credentials: "same-origin",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ "placeName": placeName,
                                                 "startDate": startDate,
                                                 "endDate": endDate
                                              })
                   });
   return await response.json();
}

function updateUI(data) {
  if (data.error) {
    alert(`${data.error}`);
    return;
  }

  const result = document.querySelector("#result");
  if(result.classList.contains("main-result-hide")) {
    result.classList.remove("main-result-hide");
  }

  if(!result.classList.contains("main-result-container")) {
    result.classList.add("main-result-container");
  }

  document.querySelector("#result-place").innerHTML = `Place: ${data.place}`;
  document.querySelector("#result-startDate").innerHTML = `Start Date: ${data.startDate}`;
  document.querySelector("#result-endDate").innerHTML = `End Date: ${data.endDate}`;
  document.querySelector("#result-tripLength").innerHTML = `Trip Length: ${data.tripLength} days`;

  const resultMinTemp = document.querySelector("#result-minTemp");
  const resultMaxTemp = document.querySelector("#result-maxTemp");
  const resultTemp = document.querySelector("#result-temp");

  if (data.forecast) {
    resultMinTemp.innerHTML = `Start Day Min Temperature: ${data.min_temp}°C`;
    resultMaxTemp.innerHTML = `Start Day Max Temperature: ${data.max_temp}°C`;
    resultTemp.setAttribute("class", "main-result-content-hide");
    resultMinTemp.setAttribute("class", "main-result-content");
    resultMaxTemp.setAttribute("class", "main-result-content");
  } else {
    resultTemp.setAttribute("class", "main-result-content");
    resultMinTemp.setAttribute("class", "main-result-content-hide");
    resultMaxTemp.setAttribute("class", "main-result-content-hide");
    resultTemp.innerHTML = `Start Day Temperature: ${data.temp}°C`;
  }

  let imageURL = placeholderImage;
  if (data.imageURL) {
    imageURL = data.imageURL;
  }

  document.querySelector("#result-image").innerHTML = `<img src=${imageURL} class="main-result-image-dimension"><div>Image from Pixabay</div>`;
}

export {
  updateStartEndDates,
  planTravel,
  planTravelOnEnterKey
};
