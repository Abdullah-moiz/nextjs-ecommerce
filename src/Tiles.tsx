import { useSelector } from "react-redux";
import { RootState } from "./Store/store";

function CategoryLength() {
  const catData = useSelector((state: RootState) => state.Admin.category);
  return catData?.length;
}

export default function GettingDatasLength() {
  const categoryLength = CategoryLength();
  
  return [
    {
      "icon": "AiOutlineClockCircle",
      "color": "text-yellow-600",
      "title": "Pending Orders",
      "count": 20
    },
    {
      "icon": "FaUserAlt",
      "color": "text-green-600",
      "title": "Total Users",
      "count": 500
    },
    {
      "icon": "GiAbstract010",
      "color": "text-blue-600",
      "title": "Total Products",
      "count": 1000
    },
    {
      "icon": "CgMenuGridR",
      "color": "text-purple-600",
      "title": "Total Categories",
      "count": categoryLength || 0
    },
    {
      "icon": "GrCompliance",
      "color": "text-orange-600",
      "title": "Completed Orders",
      "count": 100
    },
    {
      "icon": "TfiStatsUp",
      "color": "text-orange-600",
      "title": "Month Statistics",
      "count": +100
    },
  ];
}
