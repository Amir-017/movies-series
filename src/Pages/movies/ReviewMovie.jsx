import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewMovie } from "../../SystmeRdx/Slices/moviesSlices/castAndCrew";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { getMovieDetails } from "../../SystmeRdx/Slices/moviesSlices/moviesSlice";
import ShowMoreText from "react-show-more-text";
import { FaStar } from "react-icons/fa";
const ReviewMovie = () => {
  const { reviews, reviewsLoading } = useSelector(
    (state) => state.AllcastAndCrew
  );
  const dispatch = useDispatch();
  const { idMovie, nameMovie } = useParams();
  useEffect(() => {
    dispatch(getReviewMovie(idMovie));
    dispatch(getMovieDetails(idMovie));
  }, []);
  const navigate = useNavigate();
  const backAstep = () => {
    navigate(-1);
  };
  //
  const { movieDetails } = useSelector((state) => state.myMovies);
  return (
    <div className="w-full">
      {reviewsLoading ? (
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
        <div className="w-full text-white">
          <div className=" w-full  bg-[#212529] px-10 pt-5 flex justify-center items-center flex-col md:flex-row md:justify-start ">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`}
              alt="logo"
              className="rounded mb-5 w-[30%] md:w-[12%]"
            />

            <div className="w-full flex  flex-col justify-start   px-0 md:justify-center md:px-10 ">
              <h1 className="text-white font-bold  text-3xl text-center md:text-start">
                {movieDetails.title}
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

          {/*  */}
          {reviews.length >= 1 ? (
            <div className="">
              {reviews.map((review, i) => (
                <div className="my-10" key={i}>
                  <div className="container mx-auto w-[100%] bg-[#212529]  rounded-2xl py-5">
                    <div className="container mx-auto w-[70%]  flex flex-col gap-5 mt-5">
                      <div className="text-3xl flex  flex-col md:flex-row ">
                        <div className="text-center flex flex-col md:flex-row gap-y-3">
                          A Review by
                          <div className="text-[#0DCAF0] px-5 mb-3 md:mb-0">
                            {review.author}
                          </div>{" "}
                        </div>

                        <div className="w-full  md:w-[10%] h-10  flex justify-center    border-[1px]   text-white   rounded-xl">
                          <FaStar className="me-0 md:me-2" />{" "}
                          {review.author_details.rating}
                        </div>
                      </div>
                      <div className="text-2xl">
                        Written by{"  "}
                        <span className="text-[#0DCAF0]">
                          {review.author}
                        </span>{" "}
                        on
                        {"  "}
                        <span className="text-[#0DCAF0]">
                          {review.created_at.split("").slice(0, 10).join("")}
                        </span>
                      </div>

                      <div>
                        <span className="text-blue-600 text-2xl font-bold">
                          Content :-
                        </span>
                        <ShowMoreText width={550}>
                          {review.content}
                        </ShowMoreText>
                      </div>
                      <h1></h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-3xl w-[100%] bg-[#212529]  rounded-2xl py-5 font-bold text-center my-10 flex justify-center">
              We don't have any reviews for{" "}
              <span className="text-[#0DCAF0] ms-3"> {movieDetails.title}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewMovie;