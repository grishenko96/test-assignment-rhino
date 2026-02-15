import "./AlertModal.css";

type AlertModalProps = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
};

const AlertModal = ({ open, title, message, onClose }: AlertModalProps) => {
    if (!open) {
        return null;
    }

    return (
        <div className="alert-backdrop" role="presentation" onClick={onClose}>
            <div
                className="alert-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="alert-title"
                aria-describedby="alert-message"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="alert-header">
                    <h2 id="alert-title">{title}</h2>
                </div>
                <div className="alert-body">
                    <p id="alert-message">{message}</p>
                </div>
                <div className="alert-actions">
                    <button type="button" onClick={onClose}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
