import { Outlet, Link } from "react-router-dom";

const Layout = () => {
   return (
      <>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/add-penyakit">Penyakit</Link>
               </li>
               <li>
                  <Link to="/add-test">Test Penyakit</Link>
               </li>
               <li>
                  <Link to="/history">History Test</Link>
               </li>
            </ul>
         </nav>

         <Outlet />
      </>
   );
};

export default Layout;
