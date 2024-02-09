import { apiConnector } from "../apiconnector";
import {reviewEndpoints} from '../apis'

export function createReview(review, bookId,email, title,token) {
    return async () => {
      try {
        const response = await apiConnector("POST", reviewEndpoints.CREATE_REVIEW, {
          text: review,
          email: email,
          title: title,
          bookId: bookId,
          token: token
        });
  
        // console.log("LOGIN API RESPONSE........", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        alert("Review Created")

      } catch (error) {
        console.log("LOGIN API ERROR...............", error);
        alert(error.message)
      }
    };
  }

//   export async function getReview(bookId) {
//     console.log("INSIDE REVIEW", bookId);
//     try {
//         const response = await apiConnector("GET", `${reviewEndpoints.GET_REVIEW}/${bookId}`);
        
//         if (!response.data.success) {
//             throw new Error(response.data.message);
//         }
        
//         return response.data.data.review; // Return the data directly
//     } catch (error) {
//         console.log("GET ALL REVIEW API ERROR...............", error);
//         alert(error.message);
//         return null; // Return null or handle error as needed
//     }
// }

export function editReviews(reviewId, editReview, token) {
  return async () => {
    let result = []
    try {
      const response = await apiConnector("PUT", reviewEndpoints.EDIT_REVIEW, {
        reviewId: reviewId,
        newText: editReview,
        token: token
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(response.data.data)

      alert("Review Edited");

    } catch (error) {
      console.log("EDIT REVIEW API ERROR:", error);
      alert(error.message);
      return result
    }
  };
}

export function deleteReview(token, id) {
  console.log("INSIDE DELREVIEW", id)
  return async () => {
    let result = [];
    try {
      const response = await apiConnector("DELETE", reviewEndpoints.DELETE_REVIEW, {
        reviewId: id,
      },{
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(response.data.data);

      alert("Review Deleted");

    } catch (error) {
      console.log("DELETE REVIEW API ERROR:", error);
      alert(error.message);
      return result;
    }
  };
}

export function createComment(token, comment, reviewId) {
  return async () => {
    try {
      const response = await apiConnector("POST", reviewEndpoints.CREATE_COMMENT, {
        text: comment,
        reviewId: reviewId,
        token: token
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      alert("Comment Created");

    } catch (error) {
      console.log("CREATE COMMENT API ERROR:", error);
      alert(error.message);
    }
  };
}

export function editComments(token, editComment, commentId) {
  return async () => {
    try {
      const response = await apiConnector("PUT", reviewEndpoints.EDIT_COMMENT, {
        commentId: commentId,
        text: editComment,
        token: token
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      alert("Comment Edited");

    } catch (error) {
      console.log("EDIT COMMENT API ERROR:", error);
      alert(error.message);
    }
  };
}

export function deleteComment(token, commentId) {
  return async () => {
    try {
      const response = await apiConnector("DELETE", reviewEndpoints.DELETE_COMMENT, {
        commentId: commentId,
        token: token
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      alert("Comment Deleted");

    } catch (error) {
      console.log("DELETE COMMENT API ERROR:", error);
      alert(error.message);
    }
  };
}
