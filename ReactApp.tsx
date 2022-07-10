// frontend/components/App.tsx

import { React } from "./dep.ts";

const App = ({colors}) => {
  // const [colors, setColors] = React.useState(["#ffffff"])
  return (
    <>
    <form action="" method="post">
      <input type="color" id="inputColor" name="color" />
      <input type="submit" value="Enviar"/>
    </form>
    <ul>
      {colors.map( color => (<li>{color}</li>))}
    </ul>
    </>
  )
};

export default App;