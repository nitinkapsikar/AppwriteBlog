import { BrowserRouter } from "react-router-dom"
import Navbar from "./components/Navbar"
import { MainContextProvider } from "./context/MainContext"
import AppRoutes from './components/Routes'
import Footer from "./components/Footer"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {
 
  return (
    <>

  <BrowserRouter>
      <MainContextProvider>
        <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AppRoutes />
        <Footer/>
        </div>
        </Provider>
      </MainContextProvider>
    </BrowserRouter>
  
      
    </>
  )
}

export default App
