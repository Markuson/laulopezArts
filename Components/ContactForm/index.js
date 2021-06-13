import { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactFrom({onContactFrom}) {

  const recaptchaRef = useRef(null);
  const [recaptchaOK, setRecaptchaOK] = useState(false)

  const handleRecaptchaOK = () => {
    setRecaptchaOK(true)
  }

  const handleRecaptchaKO = () => {
    setRecaptchaOK(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let response = ''
    const { email, subject, text } = e.target;
    (async () => {
      response = await onContactFrom(email.value, subject.value, text.value)
      if (response ==='done'){
        email.value = ""
        subject.value = ""
        text.value = ""
      }
    })();
    recaptchaRef.current.reset()
    handleRecaptchaKO()
  }

  return <div id="contact" className="uk-padding uk-padding-remove-top uk-flex uk-flex-column uk-width-1-1">
    <div data-uk-scrollspy="cls:uk-animation-fade; delay:250; repeat: true">
      <form className="uk-width-1-1 uk-padding uk-padding-remove-top uk-flex uk-flex-center" onSubmit={(e) => handleSubmit(e)}>
        <fieldset className=" uk-width-1-1 uk-fieldset">
          <div className="uk-margin">
            <input id="email" className="uk-input" type="email" placeholder="Tu correo electrónico" />
          </div>

          <div className="uk-margin">
            <input id="subject" className="uk-input" type="text" placeholder="Asunto" />
          </div>

          <div className="uk-margin">
            <textarea id="text" className="uk-textarea" rows="5" placeholder="Mensaje"></textarea>
          </div>
          <div className="uk-flex uk-flex-center ">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaOK}
              onExpired={handleRecaptchaOK}
              onErrored={handleRecaptchaKO}
            />

          </div>
          <div className="uk-margin uk-text-center">
            {recaptchaOK && <button className="uk-button uk-button-default">Enviar</button>}
            {!recaptchaOK && <button className="uk-button uk-button-default" disabled data-uk-tooltip="Aceptar el CAPTCHA para poder enviar el correo">Enviar</button>}
          </div>
        </fieldset>
      </form>
    </div>
  </div>
}
