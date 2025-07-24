import './Loading.css';

function Loading({ message = "Laden...", size = "md" }) {
    return (
        <div className={`loading-container loading-${size}`}>
            <div className="spinner" />
            <span className="loading-message">{message}</span>
        </div>
    );
}

export default Loading;
