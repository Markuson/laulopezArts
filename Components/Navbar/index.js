import Link from 'next/link'
import {useState, useEffect} from 'react'

import styles from './styles.module.css'

export default function Navbar({
    selected = undefined
}) {

    const [isHide, setIsHide] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', hideBar);
        return () => {
            window.removeEventListener('scroll', hideBar);
        }
    }, [])

    const hideBar = () => {
        window.scrollY > 250 ?
        setIsHide(false)
        :
        setIsHide(true);
    }

    return <div className=".uk-width-1-1" >
        <div className={styles.sticky} data-uk-sticky="sel-target: .uk-navbar-container;  top: 150; animation: uk-animation-slide-top; bottom: #sticky-on-scroll-up;" >
            <nav className="uk-width-1-1 uk-navbar-container uk-navbar-transparent" data-uk-navbar data-uk-scrollspy="cls:uk-animation-fade ">
                <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav">
                        <div className='uk-padding uk-padding-remove-vertical'>
                            <li className='uk-active'>
                                <Link href="/about">
                                    <button className="uk-button uk-button-text uk-button-xlarge" disabled={selected === 'About' ? true : false} >
                                        ABOUT ME
                                    </button>
                                </Link>
                            </li>
                        </div>
                        <div className='uk-padding uk-padding-remove-vertical'>
                            <li>
                                <Link href="/">
                                    <button className="uk-button uk-button-text uk-button-xlarge" disabled={selected === 'Home' ? true : false } >
                                        PORTFOLIO
                                    </button>
                                </Link>
                            </li>
                        </div>
                        <div className='uk-padding uk-padding-remove-vertical'>
                            <li>
                                <Link href="/contact">
                                    <button className="uk-button uk-button-text uk-button-xlarge" disabled={selected === 'Contact' ? true : false } >
                                        CONTACT
                                    </button>
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
                <div hidden={isHide} className="uk-navbar-left uk-padding-small" uk-scrollspy="cls: uk-animation-fade; target: .smallLogo; offset-top  :500; delay: 1000; repeat: false">
                  <img className="smallLogo" src='images/smallLogo.png' alt="laulópez Arts"  width="80px"/>
                </div>
            </nav>
        </div>
    </div>
}
