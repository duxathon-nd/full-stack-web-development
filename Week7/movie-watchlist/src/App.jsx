import './index.css'
import Navigation from './components/Navigation'
import Footer from './components/footer'
import MovieList from './components/MovieList'

function App() {
  return (
    <>
      <Navigation />
      <h1>Movie Watchlist</h1>
      <MovieList />
      <Footer />
    </>
  );
}

export default App;