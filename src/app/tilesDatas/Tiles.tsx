"use client"
import React  from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";





export default function  GettingDatasLength() {

   
  const catData = useSelector((state: RootState) => state.Admin.category);

  const prodData = useSelector((state: RootState) => state.Admin.product);

  const orderData = useSelector((state: RootState) => state.Admin.Order);

  return [
    
    {
      icon: "FaUserAlt",
      color: "text-green-600",
      title: "Total Users",
      count: 500,
    },
    {
      icon: "GiAbstract010",
      color: "text-blue-600",
      title: "Total Products",
      count: prodData?.length || 0
    },
    {
      icon: "CgMenuGridR",
      color: "text-purple-600",
      title: "Total Categories",
      count: catData?.length || 0
    },
    {
      icon: "AiOutlineClockCircle",
      color: "text-yellow-600",
      title: "Pending Orders",
      count: orderData?.length || 0,
    },
    {
      icon: "GrCompliance",
      color: "text-orange-600",
      title: "Completed Orders",
      count: 100,
    },
    {
      icon: "TfiStatsUp",
      color: "text-orange-600",
      title: "Month Statistics",
      count: +100,
    },
  ]
}