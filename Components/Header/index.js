import Navbar from '../Navbar'

export default function Header({
    selected = undefined
}) {

    return <header className="uk-animation-fade">
    <img src='images/mainLogo.png' alt="laulópez Arts"  width="460px"/>
    <Navbar selected={selected} />
  </header>
}
