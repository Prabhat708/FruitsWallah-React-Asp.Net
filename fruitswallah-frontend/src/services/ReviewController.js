import axios from "axios"
import jwt_Decode from "jwt-decode";


const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("Token");
var UserId = null;
if(token!=null){
  UserId = jwt_Decode(token)?.UserId || null;
}
export const GetReviews = async (setReviews) => {
  
    const res = await axios.get(`${BASE_URL}/api/Reviews`
    );
    setReviews(res.data)
    
}

export const PostReview = async (data, setReviews, setShowPopup) => {
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

export const DeleteReview = async (reviewId,setReviews) => {
    const res = await axios.delete(`${BASE_URL}/api/Reviews/${reviewId}}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    GetReviews(setReviews);
}