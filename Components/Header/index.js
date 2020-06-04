import Navbar from '../Navbar'
import styles from './styles.module.css'


export default function Header({
    selected = undefined
}) {

    return <header className="uk-animation-fade">
    <img src='images/mainLogo.png' alt="laulópez Arts"  width="250px"/>
    <div className= {styles.media}>
      <div className='uk-padding-small uk-padding-remove-top'> 
        <a href="https://www.instagram.com/lau_llc/" className="uk-icon-button"><img src='icons/instagram.svg' /></a>
      </div>
      <div className='uk-padding-small uk-padding-remove-top'>
        <a href="https://www.facebook.com/entre.nusos" className="uk-icon-button"><img src='icons/behance.svg' /></a>
      </div>
      <div className='uk-padding-small uk-padding-remove-top'>
        <a href="" className="uk-icon-button"><img src='icons/linkedin.svg' /></a>
      </div>
    </div>
    <Navbar selected={selected} />
  </header>
}
