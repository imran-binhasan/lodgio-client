import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const MyBooking = () => {
  const navigate = useNavigate();
const [myBooking,setMyBooking] = useState([])
const{user} = useContext(AuthContext)
  useEffect(()=>{
    axios.get(`http://localhost:5000/bookings?email=${user.email}`)
    .then(res => setMyBooking(res.data))
  },[])
  console.log(myBooking)



  return (
    <>
    <Helmet>
      <title>My Bookings - Lodgio</title>
      <meta name="description" content="View and manage your bookings at Lodgio." />
    </Helmet>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {myBooking.length === 0 ? (
        <p className="text-gray-500 text-center">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooking.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={booking.imageUrl}
                alt={`${booking.roomName}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {booking.roomName}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Hotel:</strong> {booking.hotelName}
                </p>
                {/* <p className="text-gray-500 text-sm mb-1">
                  <strong>Booking Date:</strong>{" "}
                  {format(new Date(booking.bookingDate), "MMMM dd, yyyy")}
                </p> */}
                <p className="text-gray-500 text-sm mb-1">
                  <strong>Nights:</strong> {booking.nights}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  <strong>Total Price:</strong> $
                  {booking.pricePerNight * booking.nights}
                </p>
                <button onClick={()=> navigate(`/booking/${booking._id}`)} className="bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MyBooking;
