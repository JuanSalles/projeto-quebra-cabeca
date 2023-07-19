
import Puzzle from './components/Puzzle'
import Rodape from './components/Footer'
import Navegacao from './components/Navegar'
import './App.css'


function App() {

  
  return (
    <>
    <Navegacao />
    <div className='container'>
    <Puzzle />
    <Rodape />
    </div>
    </>
    
    
  )
}

export default App
