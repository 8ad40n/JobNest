"use client";
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import { useState } from 'react';
 
export default function FeedbackPage() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [givenById, setGivenById] = useState('');
  const [receivedById, setReceivedById] = useState('');
  const [averageRating, setAverageRating] = useState('');
  const [loading, setLoading] = useState(false);
 
  const submitFeedback = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/feedback/give', {
        rating: parseInt(rating, 10),
        comment,
        givenById: parseInt(givenById, 10),
        receivedById: parseInt(receivedById, 10),
      });
      alert('Feedback submitted successfully!');
      setRating('');
      setComment('');
      setGivenById('');
      setReceivedById('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback');
    }
    setLoading(false);
  };
 
  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/feedback/review/${receivedById}`);
      setAverageRating(`Average Rating: ${response.data}`);
    } catch (error) {
      console.error('Failed to fetch average rating:', error);
      alert('Failed to fetch average rating');
    }
  };
 
  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
    <div className="container">
      <h1>Feedback Form</h1>
      <form onSubmit={(e) => e.preventDefault()} className="feedback-form">
        <div className="input-group">
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="1-5"
            min="1"
            max="5"
          />
        </div>
        <div className="input-group">
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback"
          />
        </div>
        
        <button onClick={submitFeedback} disabled={loading} className="submit-button">
          Submit Feedback
        </button>
 
        
        
        {averageRating && <p className="average-rating">{averageRating}</p>}
      </form>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .feedback-form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 10px;
        }
        label {
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-top: 4px;
        }
        .submit-button, .fetch-button {
          padding: 10px;
          margin-top: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-button:hover, .fetch-button:hover {
          background-color: #0056b3;
        }
        .average-rating {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: bold;
        }
      `}</style>
    </div></main></>
  );
}
 