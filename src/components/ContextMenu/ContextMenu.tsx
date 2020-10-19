import React, { useEffect } from 'react';
import './ContextMenuStyles.scss';
import { IMenuData } from '../../interfaces/IMenuItems';

interface IContextMenu {
    items: IMenuData[];
    position: {
        x: number,
        y: number
    }
    closeAction: () => void;
}

const ContextMenu: React.FC<IContextMenu> = ({items, position, closeAction}) => {

    const detectClick = (e: MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (!target.closest('context-menu-body')) {
            closeAction();
        }
    };

    const escapeDetect = (e: KeyboardEvent) => {
        e.preventDefault();
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeAction();
        }
    }

    useEffect(() => {
        document.addEventListener('click', detectClick);
        document.addEventListener('keydown', escapeDetect);
        return () => {
            document.removeEventListener('click', detectClick);
            document.removeEventListener('keydown', escapeDetect);
        }
    }, []); // eslint-disable-line

    const renderItems = () =>
        items.map((item, idx) =>
            <div className='context-menu-item' onClick={item.action} key={item.text + idx}>
                {item.text}
            </div>
        )

    return (
        <section className="modal-back" data-close="true">
            <div style={{top: `${position.y}px`, left: `${position.x}px`}} className="context-menu-body">
                {renderItems()}
            </div>
        </section>
    );
};

export default ContextMenu;