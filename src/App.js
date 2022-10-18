import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


function App() {

  const [ user, setUser ] = useState({});

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    setUser(userObject);

    document.getElementById("signinDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '83561636791-hd3bsi2gaav4ft9fdr0tlpsu25hv2e87.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, [])

  // se não tivermos user: signin button
  // se tivermos: signout button
  return (
    <div className="App">
      <div id="signinDiv"></div>

      { Object.keys(user).length != 0 && 
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }

      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
