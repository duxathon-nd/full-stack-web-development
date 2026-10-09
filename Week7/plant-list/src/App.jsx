import './index.css'
import Navigation from './components/Navigation'
import Footer from './components/footer'
import PlantList from './components/PlantList'

function App() {
  return (
    <>
      <Navigation />
      <h1>Plant List</h1>
      <PlantList />
      <Footer />
    </>
  );
}

export default App;