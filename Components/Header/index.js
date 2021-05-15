import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Link from 'next/link'

export default function Header({
  selected = undefined,
  randColor,
  image,
  textColor
}) {
  return <header style={{ backgroundColor: randColor }} className="uk-animation-fade">
    <Link href="/">
      <img src={image} alt="laulópez Arts" width="460px" />
    </Link>
    <Navbar selected={selected} color={randColor} textColor={textColor} />
  </header>
}