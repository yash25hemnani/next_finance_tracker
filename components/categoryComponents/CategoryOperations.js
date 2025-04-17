"use client"

import { useEffect, useState } from "react";
import CurrentMonthChart from "./CurrentMonthChart"
import { current } from "@reduxjs/toolkit";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = ["2025"]

const CategoryOperations = ({current, color}) => {

  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [availableMonths, setAvailableMonths] = useState([])

  useEffect(() => {
    const date = new Date();

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let tempArray = [];
    for (let i = 0; i < date.getMonth() + 1; i++) {
      tempArray.push(months[i])
    }

    console.log(tempArray);

    setAvailableMonths(tempArray)

    setCurrentMonth(month);
    setCurrentYear(year.toString());
  }, []);

  return (
    <div>
      <CurrentMonthChart currentMonth={currentMonth} currentYear={currentYear} availableMonths={availableMonths} years={years} current={current} color={color}/>
    </div>
  )
}

export default CategoryOperations