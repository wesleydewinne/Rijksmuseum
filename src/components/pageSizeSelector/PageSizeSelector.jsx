import './PageSizeSelector.css';

function PageSizeSelector({ pageSize, onChange }) {
    const options = [5, 10, 25, 50];

    return (
        <div className="page-size-selector">
            <label className="label-text">Het aantal items per pagina:</label>
            <div className="radio-group">
                {options.map((value) => (
                    <label key={value} className="radio-option">
                        <span>{value}</span>
                        <input
                            type="radio"
                            name="pageSize"
                            value={value}
                            checked={pageSize === value}
                            onChange={() => onChange(value)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

export default PageSizeSelector;
