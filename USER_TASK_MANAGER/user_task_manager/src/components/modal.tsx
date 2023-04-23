import { FC, ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
    return (
        <div>
            {isOpen && (
            <div className='modal'>
                <div className='modal-content'>
                    <h2>{title}</h2>
                    {content}
                    <button className='modal-close' onClick={onClose}>CLOSE</button>
                </div>
                
            </div>
            )}
        </div>
    );
};

export default Modal;