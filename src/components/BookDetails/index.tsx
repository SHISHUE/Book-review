import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/_234f906a-b997-4ae2-ac5c-8682c5d468d1-fotor-bg-remover-20240207122312.png";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../services/operations/reviewAPI";
import { apiConnector } from "../../services/apiConnector";
import { reviewEndpoints } from "../../services/apis";
import { FaComment } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { editReviews } from "../../services/operations/reviewAPI";
import { deleteReview } from "../../services/operations/reviewAPI";
import { createComment } from "../../services/operations/reviewAPI";
import { deleteComment } from "../../services/operations/reviewAPI";
import { editComments } from "../../services/operations/reviewAPI";

function BookDetails() {
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const [book, setBook] = useState("");
  const [review, setReview] = useState("");
  const [editReview, setEditReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const token = JSON.parse(localStorage.getItem("token"));
  const [editModule, setEditModule] = useState(false);
  const [reviewComment, setReviewComment] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [comment, setComment] = useState('')
  const [commentEdit,setCommentEdit] = useState(false)
  const [commentId,setCommentId] = useState(null)
  const [editComment,setEditComment] = useState('')
  const fetchReview = async () => {
    try {
      const response = await apiConnector(
        "GET",
        `${reviewEndpoints.GET_REVIEW}/${bookId}`
      );
      console.log("INSIDE REVIEW", response.data.data);
      setReviews(response.data.data.review);
      console.log(comments)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCLXhh9IMFimbQLUEYXQPUBTtc5zz4uzaU`
        );
        console.log(res.data);
        setBook(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    fetchReview();
  }, []);

  if (loading)
    return (
      <div className="w-full h-[80vh] flex justify-center flex-col leading-none items-center font-zinc-900 text-[2vw]  animate-pulse ">
        <img src={logo} alt="logo" className="w-[12vw] animate-pulse" />
      </div>
    );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createReview(review, bookId, user.email, book?.volumeInfo?.title, token)
    );
    setReview("");
    fetchReview();
  };

  const editHandler = (e) => {
    e.preventDefault();

    dispatch(editReviews(reviewId, editReview, token));
    setEditModule(false);
    fetchReview();
  };

  const deleteHandler = (id) => {
    setReviewId(id); // Set the reviewId
    dispatch(deleteReview(token, id)); // Pass id instead of reviewId
    fetchReview();
  };

  const commentHandler = (e) => {
    e.preventDefault()

    dispatch(createComment(token, comment, reviewId))
    setComment(' ')
    setReviewComment(false)
    fetchReview();
  }

  const editCommentHandler = (e) => {
    e.preventDefault()

    dispatch(editComments(token, editComment, commentId))
    setEditComment(' ')
    fetchReview();

  } 

  return (
    <div className="w-full text-zinc-900 relative">
    <section className="w-full bg-zinc-100 shadow-xl px-[5vw] py-[2vw]">
      {/* Display book title */}
      <h1 className="text-[4vw] font-semibold leading-tight w-1/2 mb-[1vw]">
        {book?.volumeInfo?.title}
      </h1>
      {/* Display book description */}
      <h2 className="text-[1.6vw] leading-tight mb-[2vw] w-2/3">
        {book?.volumeInfo?.description || "Description not available"}
      </h2>
      {/* Display book author and categories */}
      <div className="flex gap-x-10 items-center">
        <h3 className="text-[1.1vw] text-slate-500">
          <span className="font-bold text-zinc-900 text-[1.3vw]">
            Author :{" "}
          </span>
          {book?.volumeInfo?.authors || "Anonymous"}
        </h3>
        <h3 className="text-[1.1vw] text-slate-500">
          <span className="font-bold text-zinc-900 text-[1.3vw]">
            Categories :{" "}
          </span>{" "}
          {book?.volumeInfo?.categories}
        </h3>
      </div>
    </section>
  
    <div className="w-[19vw] rounded-xl absolute right-[9vw] top-[10vw] border-[1px] bg-zinc-100 shadow-inner border-zinc-400 flex flex-col items-center">
      {/* Display book thumbnail */}
      <img
        src={book?.volumeInfo?.imageLinks?.extraLarge}
        alt="book-thumbnail"
        className="w-[80%] rounded-xl my-[1vw]"
      />
      {/* Link to read book */}
      <Link
        to={book?.volumeInfo?.canonicalVolumeLink}
        className="mb-3 mx-2 text-center rounded-xl bg-blue-500 hover:bg-blue-400 hover:text-zinc-200 hover:scale-[0.95] transition-all duration-200 text-zinc-100 px-[5vw] py-2"
      >
        Read Now
      </Link>
    </div>
  
    <section className="w-[60vw] px-[5vw] py-[2vw]">
      {/* Display section title */}
      <h1 className="text-[3vw] font-semibold text-zinc-900 border-b-[1px] border-zinc-900">
        Reviews from other Readers
      </h1>
  
      <div>
        {/* Display reviews */}
        {reviews.length ? (
          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="my-3 shadow-md rounded-xl border-[1px] border-zinc-900 px-2 py-1"
              >
                {/* Display review details */}
                <div className="flex gap-x-3 items-center">
                  <img
                    src={review?.user?.image}
                    alt="user-img"
                    className="w-[2.5vw] rounded-full my-3 items-center"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <h3 className="text-[1.2vw] ">
                        {review?.user?.firstName}
                      </h3>
                      <h3 className="text-[1.2vw]">
                        {review?.user?.lastName}
                      </h3>
                    </div>
                    <p className="text-[1vw] text-zinc-400">
                      {review?.user?.email}
                    </p>
                  </div>
                </div>
                {/* Display review text */}
                <div className="w-full pl-[2vw] flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-[1.5vw] w-[70%]">
                      {review?.text}
                    </div>
                    {/* Display comments */}
                    <div className="ml-5 items-center flex flex-col">
                      {review?.comments?.map((comment, index) => (
                        <div
                          className="flex justify-between items-center flex-col gap-x-2"
                          key={index}
                        >
                          <div className="flex gap-x-2">
                            <img
                              src={comment?.user?.image}
                              alt="user-logo"
                              className="w-[1vw] rounded-full"
                            />
                            <div className="flex gap-x-1 items-center">
                              <h4 className="text-[0.8vw]">
                                {comment?.user?.firstName}
                              </h4>
                              <h4 className="text-[0.8vw]">
                                {comment?.user?.lastName}
                              </h4>
                            </div>
                          </div>
                          <div className="w-[4vw] flex items-center gap-x-4">
                            <h4 className="ml-6 text-[1vw]">{comment?.text}</h4>
                            {/* Edit and delete comment icons */}
                            {user && user._id === review?.user?._id && (
                              <div className="flex gap-x-3 text-[0.9vw]">
                                <MdModeEditOutline
                                  onClick={() => {
                                    setCommentEdit(!commentEdit);
                                    setCommentId(comment?._id);
                                    setEditComment(comment?.text);
                                  }}
                                ></MdModeEditOutline>
                                <MdDelete
                                  onClick={() => {
                                    dispatch(deleteComment(token, comment?._id));
                                    fetchReview();
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Edit, comment, and delete icons */}
                  <div className="flex items-center gap-x-4">
                    {user && user._id === review?.user?._id && (
                      <div className="flex gap-x-3">
                        <MdModeEditOutline
                          onClick={() => {
                            setEditModule(!editModule);
                            setEditReview(review?.text);
                            setReviewId(review?._id);
                          }}
                        ></MdModeEditOutline>
                        <FaComment
                          onClick={() => {
                            setReviewComment(!reviewComment);
                            setReviewId(review?._id);
                          }}
                        ></FaComment>
                        <MdDelete onClick={() => deleteHandler(review?._id)} />
                      </div>
                    )}
                  </div>
                </div>
                {/* Edit review module */}
                {editModule && (
                  <div className="ml-6 my-2 border-[1px] border-zinc-900 rounded-md">
                    <form onSubmit={(e) => editHandler(e)}>
                      <input
                        type="text"
                        id="editreview"
                        name="editreview"
                        value={editReview}
                        onChange={(e) => setEditReview(e.target.value)}
                        className="w-full"
                      />
                      <button
                        type="submit"
                        className="p-1 bg-green-500 rounded-md m-1 items-center text-white"
                      >
                        save
                      </button>
                    </form>
                  </div>
                )}
                {/* Review comment section */}
                {reviewComment && (
                  <div className="ml-6 my-2 border-[1px] border-zinc-900 rounded-md">
                    <form onSubmit={(e) => commentHandler(e)}>
                      <input
                        type="text"
                        id="reviewcomment"
                        name="reviewcomment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full"
                        placeholder="your comments..."
                      />
                      <button
                        type="submit"
                        className="p-1 bg-green-500 rounded-md m-1 items-center text-white"
                      >
                        save
                      </button>
                    </form>
                  </div>
                )}
                {/* Edit comment section */}
                {commentEdit && (
                  <div className="ml-6 my-2 border-[1px] border-zinc-900 rounded-md">
                    <form onSubmit={(e) => editCommentHandler(e)}>
                      <input
                        type="text"
                        id="editcomment"
                        name="editcomment"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full"
                      />
                      <button
                        type="submit"
                        className="p-1 bg-green-500 rounded-md m-1 items-center text-white"
                      >
                        save
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-[2vw] font-semibold text-zinc-900">
            No reviews
          </h1>
        )}
      </div>
  
      {/* Form for submitting a new review */}
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col ml-auto mt-[2vw]"
      >
        <textarea
          cols={46}
          rows={5}
          id="review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Give your review..."
          className="border-[1px] rounded-md border-zinc-900 w-[30vw] h-[10rem] mb-3 pl-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 w-fit text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </section>
  </div>
  
  );
}

export default BookDetails;
