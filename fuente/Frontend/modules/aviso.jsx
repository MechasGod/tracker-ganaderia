import { useEffect } from 'react';
import './styles/Aviso.css';

function Aviso({ tipo, titulo, mensaje, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const checkIcon = (
    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="11" fill="black" />
        <polyline points="17 8 10 16 7 13" stroke="white" strokeWidth="2.5" />
    </svg>
    );
    const xIcon = (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );

    return (
        <div className={`toast toast-${tipo}`}>
            <div className="toast-icon">{tipo === 'success' ? checkIcon : xIcon}</div>
            <div className="toast-body">
                <p className="toast-titulo">{titulo}</p>
                <p className="toast-mensaje">{mensaje}</p>
            </div>
            <button className="toast-close" onClick={onClose}>×</button>
        </div>
    );
}

export default Aviso;