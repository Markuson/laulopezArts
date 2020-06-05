export default function Card({
    src
}) {

    return <div className="uk-box-shadow-hover-large" >
            <a href={src} data-caption="Title: description">
                <div className="uk-text-center">
                    <img src={src} />
                </div>
            </a>
    </div>
}
