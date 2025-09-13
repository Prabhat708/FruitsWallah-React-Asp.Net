import axios from "axios"

 const UserId = localStorage.getItem("UserId");
export const GetReviews = async (setReviews) => {
    const res = await axios.get("https://localhost:7293/api/Reviews");
    setReviews(res.data)
    
}

export const PostReview = async (data, setReviews, setShowPopup) => {
  const { comment } = data;
  const reviewData = {
    UserId: UserId,
    Review: comment,
  };
  const res = await axios.post(
    `https://localhost:7293/api/Reviews`,
    reviewData
  );
  GetReviews(setReviews);
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};

export const DeleteReview = async (reviewId,setReviews) => {
    const res = await axios.delete(`https://localhost:7293/api/Reviews/${reviewId}}`);
    GetReviews(setReviews);
}