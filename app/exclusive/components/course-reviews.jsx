import { FaStar,FaStarHalfAlt } from 'react-icons/fa'
import admin from "@/lib/firebase_admin"

const CourseReviews = async ({ courseId }) => {
    const reviewsDocs = await admin.firestore().collection('Exclusive_Course').doc(courseId).collection('REVIEWS').get()
    const reviews = reviewsDocs.docs.map(doc => doc.data())

    

    return (
        <div className="w-full">
            <h1 className="font-medium text-lg">Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews available</p>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="w-full bg-slate-100 p-4 mt-4 rounded-lg border border-neutral-50">
                        {review.rating && <RenderStars rating={review.rating}/>}
                        <h1 className="font-medium text-base mt-2">{review.studentname}</h1>
                        <p className="text-base">{review.studentreview}</p>
                        <div>
                            <p className="text-sm w-full text-right">
                                <DateEl date={review.date} />
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CourseReviews

const DateEl = ({date}) => {
    date = new Date(date)
    return date.toLocaleDateString()
}
const RenderStars = ({rating}) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5; 

    return (
        <div className="flex space-x-1 items-center">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className="text-yellow-400" />
            ))}
            {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        </div>
    );
};