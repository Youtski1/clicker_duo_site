
interface Props {
    full_name: string,
    level: number
}

export default function User(props: Props) {
    return (
        <>
            <p className="user__name">{props.full_name} - </p>
            <p className="user__level">{props.level} lvl</p>
        </>
    )
}