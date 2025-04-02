export default function Button ({label , color, onClick}) {
    return (
        <button onClick={onClick} style={"btn btn-" + color}>
            {label}
        </button>
    )
}