import Link from 'next/link'

export default function Navbar({
    onNavigateContact,
    onNavigateHome,
    onNavigateWorks,
    selected = undefined
}) {

    const contact = (e) => {
        e.preventDefault()
        onNavigateContact()
    }

    const home = (e) => {
        e.preventDefault()
        onNavigateHome()
    }

    const works = (e) => {
        e.preventDefault()
        onNavigateWorks()
    }

    return <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky uk-background-secondary; top: 50; animation: uk-animation-slide-top; bottom: #sticky-on-scroll-up " >
        <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar data-uk-scrollspy="cls:uk-animation-fade ">
            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    <div className='uk-padding'>
                        <li className='uk-active'>
                            <Link href="/contact">
                                <button className="uk-button uk-button-text uk-button-large" onClick={contact} disabled={selected === 'Contact' ? true : false} >
                                    CONTACTE
                                </button>
                            </Link>
                        </li>
                    </div>
                    <div className='uk-padding'>
                        <li>
                            <button className="uk-button uk-button-text uk-button-large" onClick={home} disabled={selected === 'Home' ? true : false } >
                                <Link href="/index">INICI</Link>
                            </button>
                        </li>
                    </div>
                    <div className='uk-padding'>
                        <li>
                            <button className="uk-button uk-button-text uk-button-large" onClick={works} disabled={selected === 'Works' ? true : false } >
                            <Link href="/works">TREBALLS</Link>
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
}
