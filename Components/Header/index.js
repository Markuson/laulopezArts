import Navbar from '../Navbar'

export default function Header({
    selected = undefined
}) {

    return <header>
    <img src='images/mainLogo.png' alt="laulópez Arts"  width="300px"/>
    <Navbar selected={selected} />
  </header>
}
