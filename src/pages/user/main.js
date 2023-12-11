import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "typeface-inter";
import axios from "axios";
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import ResponsiveDoughnutChart from "../components/doughnutChart";
import OffCanvasSidebar from "../components/sidebar";
import { HiPresentationChartLine } from "react-icons/hi";
import { MdBuildCircle } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

function Main() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [providerCount, setProviderCount] = useState([]);
  const [reqCount, setReqCount] = useState([]);
  const [date, setDate] = useState(new Date());
  const data = [
    { name: "Primacom", value: parseInt(providerCount.primacom) },
    { name: "Tangara", value: parseInt(providerCount.tangara) },
    { name: "IFORTE", value: parseInt(providerCount.iforte) },
    { name: "Indonet", value: parseInt(providerCount.indonet) },
  ];

  useEffect(() => {
    getRequestCount();
    getProviderCount();
  }, []);

  const getRequestCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/bca-app/requestsCount"
      );
      setReqCount(response.data);
      console.log("Request Count:", response.data);
    } catch (error) {
      console.error("Error fetching request counts:", error.message);
    }
  };

  const getProviderCount = async () => {
    await axios
      .get("http://localhost:3333/bca-app/providerCount")
      .then((response) => {
        setProviderCount(response.data);
        console.log(response);
        setDate(new Date());
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#1E56A0" }}>
        <OffCanvasSidebar />
        <img
          className="px-3"
          src={bcaLogo}
          alt="Back"
          style={{ height: "4vh" }}
        />
        <img
          className="px-3"
          src={BackLogo}
          alt="Back"
          style={{ height: "20px" }}
          onClick={() => (window.location.href = "/login")}
        />
      </nav>
      <div className="container-fluid my-3">
        <div
          className="row mx-auto centered-row"
          style={{
            backgroundColor: "white",
            borderRadius: "1px",
          }}
        >
          <div className="col-md">
            <div>
              {/* <Doughnut data={data} className='mx-auto' />  */}
              <ResponsiveDoughnutChart data={data} />
            </div>

            <h1
              style={{
                textAlign: "center",
                fontFamily: "inter",
                fontSize: "4vh",
                color: "#163172",
                marginTop: "4vh",
              }}
            >
              Provider Count
            </h1>
            <h2
              style={{
                textAlign: "center",
                fontFamily: "inter",
                fontWeight:"bold",
                fontSize: "2vh",
                color: "#163172",
              }}
            >
              Data Update : {date.toDateString()} {date.toLocaleTimeString()}
            </h2>
            <div style={{ marginTop: "7vh" }} className="row text-center">
              <div className="col">
                <div
                  className="card"
                  style={{
                    borderColor: "#ffffff",
                  }}
                >
                  <div className="card-body">
                    <h1
                      className="card-title"
                      style={{
                        fontFamily: "inter",
                        fontSize: "3vh",
                        color: "#65B741",
                      }}
                    >
                      <strong>Primacom</strong>
                    </h1>
                    <h2 style={{ color: "#004225" }}>
                      {" "}
                      {providerCount.primacom}{" "}
                    </h2>
                  </div>
                </div>
                <div
                  className="card my-1"
                  style={{
                    borderColor: "#ffffff",
                  }}
                >
                  <div className="card-body">
                    <h1
                      className="card-title"
                      style={{
                        fontFamily: "inter",
                        fontSize: "3vh",
                        color: "#E3651D",
                      }}
                    >
                      <strong>Tangara</strong>
                    </h1>

                    <h2 style={{ color: "#004225" }}>
                      {" "}
                      {providerCount.tangara}{" "}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{
                    borderColor: "#ffffff",
                  }}
                >
                  <div className="card-body">
                    <h1
                      className="card-title"
                      style={{
                        fontFamily: "inter",
                        fontSize: "3vh",
                        color: "#DA0C81",
                      }}
                    >
                      <strong>IForte</strong>
                    </h1>

                    <h2 style={{ color: "#004225" }}>
                      {" "}
                      {providerCount.iforte}{" "}
                    </h2>
                  </div>
                </div>
                <div
                  className="card my-1"
                  style={{
                    borderColor: "#ffffff",
                  }}
                >
                  <div className="card-body">
                    <h1
                      className="card-title"
                      style={{
                        fontFamily: "inter",
                        fontSize: "3vh",
                        color: "#3A1078",
                      }}
                    >
                      <strong>Indonet</strong>
                    </h1>

                    <h2 style={{ color: "#004225" }}>
                      {" "}
                      {providerCount.indonet}{" "}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md ">
            <div className="row">
              <div className="row text-center">
                <strong
                  className="mx-auto"
                  style={{
                    color: "#1E56A0",
                    fontFamily: "inter",
                    fontSize: "4vh",
                    marginTop: "20vh",
                    marginBottom: "25vh",
                  }}
                >
                  Welcome to Memo Hub
                </strong>
                <div style={{ marginBottom: "5vh", marginTop: "5vh" }}>
                  <HiPresentationChartLine
                    style={{
                      marginRight: "3vh",
                      color: "#1E56A0",
                      fontSize: "50px",
                    }}
                  />
                  <strong
                    className="mx-auto"
                    style={{
                      color: "#1E56A0",
                      fontFamily: "inter",
                      fontSize: "4vh",
                    }}
                  >
                    Request Pending
                  </strong>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div
                    class="card"
                    style={{
                      borderColor: "#ffffff",
                    }}
                  >
                    <div class="card-body">
                      <h1
                        class="card-title"
                        style={{ fontSize: "2vh", color: "#65B741" }}
                      >
                        <div>
                          <MdBuildCircle
                            style={{
                              marginRight: "1vh",
                              color: "#1E5128",
                              fontSize: "25px",
                            }}
                          />
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#1E5128",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Installation Request
                          </strong>
                        </div>
                      </h1>

                      <h2 style={{ color: "#1E5128" }}>
                        {" "}
                        {reqCount.installation}{" "}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div
                    class="card"
                    style={{
                      borderColor: "#ffffff",
                    }}
                  >
                    <div class="card-body">
                      <h1
                        class="card-title"
                        style={{ fontSize: "2vh", color: "#F05941" }}
                      >
                        <div>
                          <FaTruckMoving
                            style={{
                              marginRight: "1vh",
                              color: "#F05941",
                              fontSize: "25px",
                            }}
                          />
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#F05941",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Relocation Request
                          </strong>
                        </div>
                      </h1>

                      <h2 style={{ color: "#F05941" }}>
                        {" "}
                        {reqCount.relocation}{" "}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div
                    class="card"
                    style={{
                      borderColor: "#ffffff",
                    }}
                  >
                    <div class="card-body">
                      <h1
                        class="card-title"
                        style={{ fontSize: "2vh", color: "#65B741" }}
                      >
                        <div>
                          <IoMdRemoveCircle
                            style={{
                              marginRight: "1vh",
                              color: "#B31312",
                              fontSize: "25px",
                            }}
                          />
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#B31312",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Dismantle Request
                          </strong>
                        </div>
                      </h1>

                      <h2 style={{ color: "#B31312" }}>
                        {" "}
                        {reqCount.dismantle}{" "}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
