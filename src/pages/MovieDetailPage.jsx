import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CreateRatingForm from '../components/CreateRatingForm.jsx'

export default function MovieDetailPage() {
  const {movie: {title, posterPath, overview, releaseDate, movieId}} = useLoaderData();
  const navigate = useNavigate();

  const handleCreateRating = async (event, { score }) => {
    event.preventDefault();
    const res = await axios.post('/api/ratings', {score: score, movieId: movieId});
    if (res.data){
      navigate('/me');
    }
  };

  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  
  const prettyDate = releaseDate.split('').slice(0, 10).join('').split('-')

  return (
    <>
      <h1>{title}</h1>
      <h2>{months[prettyDate[1]]} {prettyDate[2]}, {prettyDate[0]}</h2>
      <img src={posterPath} alt={title} style={{width:'200px'}} />
      <p>{overview}</p>
      <h2>Rate this movie</h2>
      <CreateRatingForm onCreateRating={handleCreateRating} />
    </>
  );
}
