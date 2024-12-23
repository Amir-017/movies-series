import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBackDropsSeries,
  getSeriesDetails,
} from "../../SystmeRdx/Slices/seriesSlices/homeSeriesSlice";
import { Button } from "@material-tailwind/react";

const BackDropsSeries = () => {
  const { idseries } = useParams();

  const {
    seriesDetails,
    seriesDetails: { genres },
    //

    backDropsSeries: { backdrops },
    backDropsSeriesLoading,
  } = useSelector((state) => state.series);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesDetails(idseries));

    dispatch(getBackDropsSeries(idseries));
  }, []);
  const navigate = useNavigate();

  const backAstep = () => {
    navigate(-1);
  };
  return (
    <div className="w-full">
      {backDropsSeriesLoading ? (
        <div className=" grid min-h-[140px] w-full place-items-center  overflow-x-scroll rounded-lg p-6 lg:overflow-visible h-screen justify-items-center items-center">
          <svg
            className="w-16 h-16 animate-spin text-white"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="my-10">
          <div className=" w-full  bg-[#212529] px-10 pt-5 flex justify-center items-center flex-col md:flex-row md:justify-start rounded-[3rem]">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${seriesDetails.poster_path}`}
              alt="logo"
              className="rounded-2xl mb-5 w-[30%] md:w-[12%] "
            />

            <div className="w-full flex  flex-col justify-start   px-0 md:justify-center md:px-10 ">
              <h1 className="text-white font-bold  text-3xl text-center md:text-start">
                {seriesDetails.name}
              </h1>
              <div className="my-5 flex justify-center md:justify-start">
                <Button
                  onClick={backAstep}
                  variant="outlined"
                  className=" border-[#0DCAF0]  text-[#0DCAF0] hover:bg-[#0DCAF0] hover:text-black"
                >
                  Back a step
                </Button>
              </div>
            </div>
          </div>
          <div className="text-white text-4xl container mx-auto my-10 text-center lg:text-start">
            All BackDrops :{" "}
            <span className="underline text-[#0DCAF0]">{backdrops.length}</span>
          </div>
          <div className="w-full grid justify-items-center grid-cols-1  gap-10 container mx-auto md:grid-cols-2 lg:grid-cols-3">
            {backdrops &&
              backdrops.map((imgBack, i) => (
                <div className="" key={i}>
                  <img
                    className="rounded-2xl"
                    alt=""
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${imgBack.file_path}`}
                    width={200}
                    height={200}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackDropsSeries;