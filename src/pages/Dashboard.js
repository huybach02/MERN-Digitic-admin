import React, {useEffect, useState} from "react";
import {BsArrowDownRight, BsArrowUpRight} from "react-icons/bs";
import {Column} from "@ant-design/plots";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getMonthlyOrders} from "../features/auth/authSlice";
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

  const {monthlyOrdersInfo} = useSelector((state) => state.auth);
  console.log("monthlyOrdersInfo: ", monthlyOrdersInfo);

  const [dataMonthlyMoney, setDataMonthlyMoney] = useState([]);
  const [dataMonthlyOrderCount, setDataMonthlyOrderCount] = useState([]);

  console.log(
    monthlyOrdersInfo?.find((item) => +item?._id?.month === 11)?.amount
  );

  useEffect(() => {
    setDataMonthlyMoney([
      {
        type: "Jan",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 1)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 1)?.amount
          : 0,
      },
      {
        type: "Feb",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 2)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 2)?.amount
          : 0,
      },
      {
        type: "Mar",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 3)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 3)?.amount
          : 0,
      },
      {
        type: "Apr",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 4)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 4)?.amount
          : 0,
      },
      {
        type: "May",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 5)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 5)?.amount
          : 0,
      },
      {
        type: "Jun",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 6)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 6)?.amount
          : 0,
      },
      {
        type: "July",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 7)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 7)?.amount
          : 0,
      },
      {
        type: "Aug",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 8)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 8)?.amount
          : 0,
      },
      {
        type: "Sept",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 9)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 9)?.amount
          : 0,
      },
      {
        type: "Oct",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 10)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 10)?.amount
          : 0,
      },
      {
        type: "Nov",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 11)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 11)?.amount
          : 0,
      },
      {
        type: "Dec",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 12)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 12)?.amount
          : 0,
      },
    ]);
    setDataMonthlyOrderCount([
      {
        type: "Jan",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 1)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 1)?.count
          : 0,
      },
      {
        type: "Feb",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 2)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 2)?.count
          : 0,
      },
      {
        type: "Mar",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 3)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 3)?.count
          : 0,
      },
      {
        type: "Apr",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 4)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 4)?.count
          : 0,
      },
      {
        type: "May",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 5)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 5)?.count
          : 0,
      },
      {
        type: "Jun",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 6)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 6)?.count
          : 0,
      },
      {
        type: "July",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 7)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 7)?.count
          : 0,
      },
      {
        type: "Aug",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 8)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 8)?.count
          : 0,
      },
      {
        type: "Sept",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 9)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 9)?.count
          : 0,
      },
      {
        type: "Oct",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 10)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 10)?.count
          : 0,
      },
      {
        type: "Nov",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 11)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 11)?.count
          : 0,
      },
      {
        type: "Dec",
        sales: monthlyOrdersInfo?.find((item) => +item?._id?.month === 12)
          ? monthlyOrdersInfo?.find((item) => +item?._id?.month === 12)?.count
          : 0,
      },
    ]);
  }, [monthlyOrdersInfo]);

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
    dispatch(getMonthlyOrders());
  }, []);

  // useEffect(() => {
  //   const month = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   let dataMoney = [];
  //   let dataCountOrder = [];
  //   for (let i = 0; i < monthlyOrdersInfo?.length; i++) {
  //     const element = monthlyOrdersInfo[i];
  //     dataMoney.push({
  //       type: month[+element?._id?.month - 1],
  //       sales: element?.amount,
  //     });
  //     dataCountOrder.push({
  //       type: month[+element?._id?.month - 1],
  //       sales: element?.count,
  //     });
  //   }
  //   if (dataMoney.length > 0) {
  //     // setDataMonthlyMoney(dataMoney);
  //     // setDataMonthlyMoneyOrderCount(dataCountOrder);
  //   }
  // }, [monthlyOrdersInfo]);

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 shadow-main">
          <div>
            <h3 className="desc fw-bold mb-5">Income This Month</h3>
            <h3 className="mb-0 sub-title">
              {"$ " +
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth() + 1
                )?.amount}
            </h3>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6
              className={
                handleRate(
                  monthlyOrdersInfo?.find(
                    (item) => +item?._id?.month === new Date().getMonth()
                  )?.amount,
                  monthlyOrdersInfo?.find(
                    (item) => +item?._id?.month === new Date().getMonth() + 1
                  )?.amount
                ) > 0
                  ? "green"
                  : "red"
              }
            >
              {handleRate(
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth()
                )?.amount,
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth() + 1
                )?.amount
              ) > 0 ? (
                <BsArrowUpRight />
              ) : (
                <BsArrowDownRight />
              )}{" "}
              {handleRate(
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth()
                )?.amount,
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth() + 1
                )?.amount
              ) + "%"}
            </h6>
            <p className="mb-0  desc">Compared with the previous month</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3 shadow-main">
          <div>
            <h3 className="desc fw-bold mb-5">Orders This Month</h3>
            <h3 className="mb-0 sub-title">
              {monthlyOrdersInfo?.find(
                (item) => +item?._id?.month === new Date().getMonth() + 1
              )?.count + " order"}
            </h3>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6
              className={
                handleRate(
                  monthlyOrdersInfo?.find(
                    (item) => +item?._id?.month === new Date().getMonth()
                  )?.amount,
                  monthlyOrdersInfo?.find(
                    (item) => +item?._id?.month === new Date().getMonth() + 1
                  )?.amount
                ) > 0
                  ? "green"
                  : "red"
              }
            >
              {handleRate(
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth()
                )?.amount,
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth() + 1
                )?.amount
              ) > 0 ? (
                <BsArrowUpRight />
              ) : (
                <BsArrowDownRight />
              )}{" "}
              {handleRate(
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth()
                )?.count,
                monthlyOrdersInfo?.find(
                  (item) => +item?._id?.month === new Date().getMonth() + 1
                )?.count
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
