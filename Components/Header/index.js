import Navbar from '../Navbar'
import styles from './styles.module.css'


export default function Header({
    selected = undefined
}) {

    return <header className="uk-animation-fade">
    <img src='images/mainLogo.png' alt="laulópez Arts"  width="250px"/>
    <div className= {styles.media}>
      <div className='uk-padding-small uk-padding-remove-top'>
        <a href="https://www.facebook.com/entre.nusos" class="uk-icon-button"><img src='/facebook.svg' /></a>
      </div>
      <div className='uk-padding-small uk-padding-remove-top'> 
        <a href="https://www.instagram.com/lau_llc/" class="uk-icon-button"><img src='/instagram.svg' /></a>
      </div>
      <div className='uk-padding-small uk-padding-remove-top'>
        <a href="" class="uk-icon-button"><img src='/twitter.svg' /></a>
      </div>
    </div>
    <Navbar selected={selected} />
  </header>
}
