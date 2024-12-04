function Button(props) {
    return (
        <button className={props.class} onClick={props.func}>
            {props.text}
        </button>
    );
}

export default Button;