const MyButton = ({children, disabled, className, onClick}) => {
    return (
        <button onClick={onClick} className={className} disabled={disabled}>{children}</button>
    );
}

export default MyButton;
