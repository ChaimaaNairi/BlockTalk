import Navbar from "./navbar";
import Footer from "./footer"


const App = createContext();

const Layout = ({ children }) => {

  return (
    <App.Provider>
       
          <Navbar />
          {children}
          <Footer />
        
    </App.Provider>
  );
}

export default Layout;
export { App };