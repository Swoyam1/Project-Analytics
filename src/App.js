import { Provider } from "react-redux";
import Analytics from "./page/Analytics";
import store from "./reduxState/store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Analytics />
      </Provider>
    </>
  );
}

export default App;
