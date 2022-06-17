import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../../requestMethods";

const Dashboard = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getUserStats();
  }, [MONTHS]);
  console.log(userStats);

  return (
    <div>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <Widgets>
        <WidgetSm />
        <WidgetLg />
      </Widgets>
    </div>
  );
};

const Widgets = styled.div`
  width: 90%;
  display: flex;
  margin: 2rem 4rem;
`;
export default Dashboard;
