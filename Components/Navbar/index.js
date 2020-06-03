import Link from 'next/link'

import styles from './styles.module.css'

export default function Navbar({
    selected = undefined
}) {

    return <div className=".uk-width-1-1" >
        <div className={styles.sticky} data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; top: 150; animation: uk-animation-slide-top; bottom: #sticky-on-scroll-up; .uk-box-shadow-small" >
            <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar data-uk-scrollspy="cls:uk-animation-fade ">
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
            </nav>
        </div>
    </div>
}
