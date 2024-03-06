import './App.css'

function App() {

  return (
    <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
        <h1 className='text-6xl text-neutral mb-24'>Welcome to PhotoHive</h1>
        <button className='btn btn-outline btn-primary text-4xl'>Login</button> 
        <span className='text-2xl ml-4'>to spawn your hive</span>
        <img className='w-1/6 mx-auto mt-4' src='../public/hivephoto.png'/>
    </div>
  )
}

export default App
