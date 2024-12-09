import Configuration from './components/Configuration';
import Description from './components/description';
import Diagram from './components/Diagram';
import Information from './components/Information';

function App() {

  return (
  <div className='flex w-full'>
    <div className='flex w-4/5 gap-4'>
      <Diagram/>
      <Information />
    </div>
    <div className='flex flex-col gap-4 mt-4 w-1/5'>
      <Configuration/>
      <Description />
    </div>
  </div>
  )
}

export default App
