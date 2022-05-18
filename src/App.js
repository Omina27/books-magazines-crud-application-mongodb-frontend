import { Route, Routes } from 'react-router-dom'
import Magazine from "./magazine"
import Books  from "./books"

function App() {
  return (
    <>

    {/* <Magazine/> */}
     <Routes>
        <Route path='/' element={<Books/>}/>
        <Route  path='/magazine' element={<Magazine/>}/>
      </Routes>
    </>
  );
}

export default App;

