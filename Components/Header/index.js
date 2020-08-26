import {useEffect, useState} from 'react'
import Navbar from '../Navbar'
import Link from 'next/link'

export default function Header({
  selected = undefined
}) {
  const [mainLogo, setMainLogo] = useState('');
  const [randColor, setrandColor] = useState("#f5e3ae");

  useEffect(() => {
    setMainLogo(randomizeLogo())
  }, [])

  const randomizeLogo = () => {
    const randNum = Math.floor(Math.random()*4);

    switch (randNum) {
      case 0:
        return 'images/mainLogo1.png'
        break;
      case 1:
        return 'images/mainLogo2.png'
        break;

      case 2:
        return 'images/mainLogo3.png'
        break;

      case 3:
        return 'images/mainLogo4.png'
        break;

      default:
        break;
    }
  }
  const randomizeColor = () => {

  }

  return <header style={{backgroundColor:randColor}} className="uk-animation-fade">
    <Link href="/">
      <img src={mainLogo} alt="laulópez Arts" width="460px" />
    </Link>
    <Navbar selected={selected} color={randColor}/>
  </header>
}
