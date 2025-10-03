import axios from "axios"
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GetReviews = async (setReviews) => {
  
  const res = await axios.get(`${BASE_URL}/api/Reviews`
  );
  setReviews(res.data)
  
}

export const PostReview = async (data, setReviews, setShowPopup) => {
  const { token, UserId } = useAuthStore.getState();
  const { comment } = data;
  if (comment == null || comment.trim() === "") {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: "Please enter your review!" };
  } else if (UserId == null) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: "User not found. Please login again." };
  }else if (comment.length > 200) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }
      , 2000);
    return { status: false, message: "Review should be less than 200 characters." };
  } else if (comment.length < 10) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: "Review should be more than 10 characters." };
  }
  const reviewData = {
    UserId: UserId,
    Review: comment,
  };
  const res = await axios.post(`${BASE_URL}/api/Reviews`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  GetReviews(setReviews);
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
  return { status: true, message: res.data  };
};

export const DeleteReview = async (reviewId, setReviews) => {
  const { token } = useAuthStore.getState();
  try {
    const res = await axios.delete(`${BASE_URL}/api/Reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    GetReviews(setReviews);
    return { status: true, message: res.data  };
  } catch (error) {
    return { status: false, message: "Failed to delete review."  };
  }
}