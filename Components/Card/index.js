export default function Card({
    src
}) {

    return <div className="uk-card uk-card-hover uk-card-small" >
            <a href={src} data-caption="Title: description">
                <div className="uk-text-center">
                    <img src={src} />
                </div>
            </a>
    </div>
}
