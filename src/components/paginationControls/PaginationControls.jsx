import React from 'react';
import BasicButton from '../button/basic/BasicButton.jsx';
import './PaginationControls.css';

function PaginationControls({ page, setPage, isLastPage, totalPages }) {
    return (
        <nav className="pagination-controls" aria-label="Paginanavigatie">
            <ul className="pagination-list">
                <li>
                    <BasicButton
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        variant="default"
                        aria-label="Vorige pagina"
                        className="btn-primary"
                    >
                        &lt;
                    </BasicButton>
                </li>
                <li className="page-info">
                    Pagina {page} {totalPages && `van ${totalPages}`}
                </li>
                <li>
                    <BasicButton
                        onClick={() => setPage(p => p + 1)}
                        disabled={isLastPage}
                        variant="default"
                        aria-label="Volgende pagina"
                        className="btn-primary"
                    >
                        &gt;
                    </BasicButton>
                </li>
            </ul>
        </nav>

    );
}

export default PaginationControls;
