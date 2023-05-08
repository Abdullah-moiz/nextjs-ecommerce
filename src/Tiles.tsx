import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store/store";
import { useDispatch } from 'react-redux';
import { setCatLoading, setCategoryData } from '@/utils/AdminSlice';
import useSWR from 'swr'
import { get_all_categories } from '@/Services/Admin/category';
import { toast } from "react-toastify";

function CategoryLength() {
  const dispatch = useDispatch();
  const catData = useSelector((state: RootState) => state.Admin.category);
  const [length, setLength] = useState(catData?.length || 0);


  const { data: categoryData, isLoading: categoryLoading } = useSWR('/gettingAllCategoriesFOrAdmin', get_all_categories)
  if (categoryData?.success !== true) toast.error(categoryData?.message)

  useEffect(() => {
    console.log(categoryData?.data)
    dispatch(setCategoryData(categoryData?.data))
    dispatch(setCatLoading(categoryLoading))
  }, [categoryData, dispatch, categoryLoading])

  useEffect(() => {
    setLength(categoryData?.data?.length || 0);
  }, [categoryData]);

  return length;
}

export default function GettingDatasLength() {
  const categoryLength = CategoryLength();

  return [
    {
      icon: "AiOutlineClockCircle",
      color: "text-yellow-600",
      title: "Pending Orders",
      count: 20,
    },
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
      count: 1000,
    },
    {
      icon: "CgMenuGridR",
      color: "text-purple-600",
      title: "Total Categories",
      count: categoryLength,
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
  ];
}
