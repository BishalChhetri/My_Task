import "./App.css";
import FormBody from "./components/formbody";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <FormBody />
      </SnackbarProvider>
    </div>
  );
}

export default App;
