export default function Card({
    src
}) {

    return <div className="card" >
        <a>
            <img src={src}/>
        </a>
    </div>
}
