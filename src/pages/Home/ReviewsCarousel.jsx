import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const ReviewsCarousel = () => {
    const [reviewsData, setReviewsData] = useState([]);
    useEffect(() => {
        axios.get(`https://lodgio-server.vercel.app/reviews`)
            .then(res => setReviewsData(res.data))
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // medium devices
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    dots: true,
                },
            },
            {
                breakpoint: 768, // small devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 6,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto my-10 px-4">
            <h2 className="text-center text-3xl font-medium mb-6">What Our Guests Say</h2>
            <Slider {...settings}>
                {reviewsData.map((review, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className="md:flex items-center mb-4">
                                <img
                                    src={review.userImage}
                                    alt={review.username}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold">{review.username}</h3>
                                    <p className="text-sm text-gray-500">{review.email}</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className="text-yellow-500">
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-sm text-gray-400 mt-4">{new Date(review.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ReviewsCarousel;
