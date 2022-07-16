// frontend/components/App.tsx

import { React } from "./dep.ts";

interface AppProps {
  colors: Array<string>
}

const App:React.FC<AppProps> = ({colors}) => {
  // const [colors, setColors] = React.useState(["#ffffff"])
  return (
    <>
    <form action="" method="post">
      <input type="color" id="inputColor" name="color" />
      <input type="submit" value="Enviar"/>
    </form>
    <ul>
      {colors.map( color => (<li style={{color}}>{color}</li>))}
    </ul>
    </>
  )
};

export default App;