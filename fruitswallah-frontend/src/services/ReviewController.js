import axios from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("Token");
 const UserId = localStorage.getItem("UserId");
export const GetReviews = async (setReviews) => {
  
    const res = await axios.get(`${BASE_URL}/api/Reviews`
    );
    setReviews(res.data)
    
}

export const PostReview = async (data, setReviews, setShowPopup) => {
  const { comment } = data;
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
};

export const DeleteReview = async (reviewId,setReviews) => {
    const res = await axios.delete(`${BASE_URL}/api/Reviews/${reviewId}}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    GetReviews(setReviews);
}