import { Request, Response } from "express";
import { db } from "../firebase";


const addReview = async (req: Request, res: Response): Promise<any> => {
  try {
    const { rating, comment, user } = req.body;
    const { clinicId } = req.params;

    const review = {
      clinicId,
      rating,
      comment,
      user,
      date: new Date().toISOString().split("T")[0],
    };

    const reviewsRef = db.collection("reviews");
    await reviewsRef.add(review);

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error: any) {
    console.error("Error adding review:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
};

export { addReview };
