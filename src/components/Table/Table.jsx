import React, { useEffect, useState } from "react";
import { insertTable } from "../../reduxState/feature/TableSlice";
import { getAppName } from "../../reduxState/feature/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./table.module.css";
import LoadingSpinner from "./Loading/LoadingSpinner";

const Table = ({ column, dateRange }) => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const dispatch = useDispatch();

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const getTableData = async () => {
    try {
      let startDate = convert(dateRange[0]);
      let endDate = convert(dateRange[1]);
      setLoading1(true);
      const reportResponse = await fetch(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
      );
      const reportData = await reportResponse.json();
      //console.log(reportData);
      dispatch(insertTable({ table: reportData.data }));
      setLoading1(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getAppData = async () => {
    try {
      setLoading2(true);
      const appResponse = await fetch(
        "http://go-dev.greedygame.com/v3/dummy/apps"
      );
      const appData = await appResponse.json();
      const json = createJSON(appData.data);
      dispatch(getAppName({ appName: json }));
      setLoading2(false);
    } catch (error) {
      console(error);
    }
  };
  useEffect(() => {
    getTableData();
    getAppData();
  }, [dateRange]);

  const tableData = useSelector((state) => state.table.table);
  const appName = useSelector((state) => state.appName.appName);

  const month = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  function createJSON(data) {
    let item = {};
    for (let i = 0; i < data.length; i++) {
      var app_id = data[i].app_id;
      var app_name = data[i].app_name;
      item[`${app_id}`] = app_name;
    }
    return item;
  }

  const handleDate = (date) => {
    var d = new Date(date);
    return `${d.getUTCDate()} ${month[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  };
  const handleAppId = (app_id) => {
    return appName[app_id];
  };
  const handleRequest = (requests) => {
    return requests?.toLocaleString("en-US");
  };
  const handleResponse = (responses) => {
    return responses?.toLocaleString("en-US");
  };
  const handeImpression = (impressions) => {
    return impressions?.toLocaleString("en-US");
  };
  const handleRevenue = (revenue) => {
    return "$" + Number(revenue?.toLocaleString("en-US")).toFixed(2);
  };
  const handleFillrate = (requests, responses) => {
    return (
      Number(((requests / responses) * 100).toLocaleString("en-US")).toFixed(
        2
      ) + "%"
    );
  };
  const handleCTR = (clicks, impressions) => {
    return (
      Number(((clicks / impressions) * 100).toLocaleString("en-US")).toFixed(
        2
      ) + "%"
    );
  };

  return (
    <>
      {loading1 || loading2 ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.appTable}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                {column.map((value) =>
                  Object.values(value)[0] ? (
                    <th
                      style={{
                        textTransform: "capitalize",
                        textAlign:
                          Object.keys(value)[0] === "app_id" ||
                          Object.keys(value)[0] === "date"
                            ? "left"
                            : "right",
                      }}
                    >
                      <div className={styles.thContainer}>
                        <div className={styles.filterContainer}>
                          <img
                            src="filter.png"
                            alt="app-logo"
                            height="25"
                            width="25"
                          />
                        </div>
                        {Object.keys(value)[0]}
                        <br />
                      </div>
                    </th>
                  ) : (
                    ""
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((value) => (
                <tr>
                  {column.map((item) => {
                    const key = Object.keys(item)[0];
                    return Object.values(item)[0] ? (
                      key === "date" ? (
                        <td style={{ textAlign: "left" }}>
                          {handleDate(value[key])}
                        </td>
                      ) : key === "app_id" ? (
                        <td style={{ textAlign: "left" }}>
                          <img
                            src="AppLogo.png"
                            alt="app-logo"
                            className="app-logo"
                          />
                          {handleAppId(value[key])}
                        </td>
                      ) : key === "requests" ? (
                        <td> {handleRequest(value[key])}</td>
                      ) : key === "responses" ? (
                        <td> {handleResponse(value[key])}</td>
                      ) : key === "impressions" ? (
                        <td> {handeImpression(value[key])}</td>
                      ) : key === "revenue" ? (
                        <td> {handleRevenue(value[key])}</td>
                      ) : key === "fill_rate" ? (
                        <td>
                          {handleFillrate(value.requests, value.responses)}
                        </td>
                      ) : key === "CTR" ? (
                        <td>{handleCTR(value.clicks, value.impressions)}</td>
                      ) : (
                        <td>{value[key]}</td>
                      )
                    ) : (
                      ""
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
