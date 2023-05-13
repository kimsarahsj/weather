  export function getFormattedDate(long) {
    var today = new Date();
    var day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var lmonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var smonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (long) {
      return `${day[today.getDay()]}, ${lmonth[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    } else {
      return `${day[today.getDay()]}, ${smonth[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    }
  }

  export function convertToCelsius(temp)
  {
    return Math.round((parseFloat(temp) - 32) * (5 / 9));
  }




