import React, {useEffect, useState} from "react";
import {BsArrowDownRight, BsArrowUpRight} from "react-icons/bs";
import {Column} from "@ant-design/plots";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getMonthlyIncomes, getMonthlyOrders} from "../features/auth/authSlice";
import {handleRate} from "../utils/const";

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 1; i < 500; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();

  const {monthlyIncomes, monthlyOrders} = useSelector((state) => state.auth);
  console.log("monthlyIncomes: ", monthlyIncomes);

  const [dataMonthlyMoney, setDataMonthlyMoney] = useState([]);
  const [dataMonthlyOrderCount, setDataMonthlyOrderCount] = useState([]);

  useEffect(() => {
    setDataMonthlyMoney([
      {
        type: "Jan",
        sales: monthlyIncomes[0],
      },
      {
        type: "Feb",
        sales: monthlyIncomes[1],
      },
      {
        type: "Mar",
        sales: monthlyIncomes[2],
      },
      {
        type: "Apr",
        sales: monthlyIncomes[3],
      },
      {
        type: "May",
        sales: monthlyIncomes[4],
      },
      {
        type: "Jun",
        sales: monthlyIncomes[5],
      },
      {
        type: "July",
        sales: monthlyIncomes[6],
      },
      {
        type: "Aug",
        sales: monthlyIncomes[7],
      },
      {
        type: "Sept",
        sales: monthlyIncomes[8],
      },
      {
        type: "Oct",
        sales: monthlyIncomes[9],
      },
      {
        type: "Nov",
        sales: monthlyIncomes[10],
      },
      {
        type: "Dec",
        sales: monthlyIncomes[11],
      },
    ]);
    setDataMonthlyOrderCount([
      {
        type: "Jan",
        sales: monthlyOrders[0],
      },
      {
        type: "Feb",
        sales: monthlyOrders[1],
      },
      {
        type: "Mar",
        sales: monthlyOrders[2],
      },
      {
        type: "Apr",
        sales: monthlyOrders[3],
      },
      {
        type: "May",
        sales: monthlyOrders[4],
      },
      {
        type: "Jun",
        sales: monthlyOrders[5],
      },
      {
        type: "July",
        sales: monthlyOrders[6],
      },
      {
        type: "Aug",
        sales: monthlyOrders[7],
      },
      {
        type: "Sept",
        sales: monthlyOrders[8],
      },
      {
        type: "Oct",
        sales: monthlyOrders[9],
      },
      {
        type: "Nov",
        sales: monthlyOrders[10],
      },
      {
        type: "Dec",
        sales: monthlyOrders[11],
      },
    ]);
  }, [monthlyIncomes, monthlyOrders]);

  const config = {
    data: dataMonthlyMoney,
    xField: "type",
    yField: "sales",
    color: ({type}) => {
      return "#6394f9";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlyOrderCount,
    xField: "type",
    yField: "sales",
    color: ({type}) => {
      return "#6394f9";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  useEffect(() => {
    dispatch(getMonthlyIncomes());
    dispatch(getMonthlyOrders());
  }, []);

  const handleHandleValueThisMonth = (array) => {
    const month = new Date().getMonth();
    for (let i = 0; i < array.length; i++) {
      if (i === month) {
        return array[i];
      }
    }
  };

  const handleCreateValueRate = (array, thisMonth) => {
    for (let i = 0; i < array.length; i++) {
      if (i === thisMonth) {
        return array[i];
      }
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 shadow-main">
          <div>
            <h3 className="desc fw-bold mb-5">Income This Month</h3>
            <h3 className="mb-0 sub-title">
              {"$ " + handleHandleValueThisMonth(monthlyIncomes)}
            </h3>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6
              className={
                handleRate(
                  handleCreateValueRate(
                    monthlyIncomes,
                    new Date().getMonth() - 1
                  ),
                  handleCreateValueRate(monthlyIncomes, new Date().getMonth())
                ) > 0
                  ? "green"
                  : "red"
              }
            >
              {handleRate(
                handleCreateValueRate(
                  monthlyIncomes,
                  new Date().getMonth() - 1
                ),
                handleCreateValueRate(monthlyIncomes, new Date().getMonth())
              ) > 0 ? (
                <BsArrowUpRight />
              ) : (
                <BsArrowDownRight />
              )}{" "}
              {handleRate(
                handleCreateValueRate(
                  monthlyIncomes,
                  new Date().getMonth() - 1
                ),
                handleCreateValueRate(monthlyIncomes, new Date().getMonth())
              ) + "%"}
            </h6>
            <p className="mb-0  desc">Compared with the previous month</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 shadow-main">
          <div>
            <h3 className="desc fw-bold mb-5">Orders This Month</h3>
            <h3 className="mb-0 sub-title">
              {handleHandleValueThisMonth(monthlyOrders) + " orders"}
            </h3>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6
              className={
                handleRate(
                  handleCreateValueRate(
                    monthlyOrders,
                    new Date().getMonth() - 1
                  ),
                  handleCreateValueRate(monthlyOrders, new Date().getMonth())
                ) > 0
                  ? "green"
                  : "red"
              }
            >
              {handleRate(
                handleCreateValueRate(monthlyOrders, new Date().getMonth() - 1),
                handleCreateValueRate(monthlyOrders, new Date().getMonth())
              ) > 0 ? (
                <BsArrowUpRight />
              ) : (
                <BsArrowDownRight />
              )}{" "}
              {handleRate(
                handleCreateValueRate(monthlyOrders, new Date().getMonth() - 1),
                handleCreateValueRate(monthlyOrders, new Date().getMonth())
              ) + "%"}
            </h6>
            <p className="mb-0  desc">Compared with the previous month</p>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex flex-column gap-5">
        <div>
          <h3 className="pb-5">Monthly Income ($)</h3>
          <Column {...config} />
        </div>
        <div>
          <h3 className="pb-5">Monthly Orders Count</h3>
          <Column {...config2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
