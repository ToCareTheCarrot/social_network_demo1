import React, {useState} from 'react';
import c from './paginator.module.css';

export let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let numberOfPages = Math.ceil(totalItemsCount / pageSize);

    let pages = [];

    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }

    let portionsCount = Math.ceil(numberOfPages/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={c.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span
                        key={p}
                        className={p === currentPage ? c.selectedPage : c.pageNumber }
                        onClick={() => onPageChanged(p)}>{p}</span>
                })}
            {portionNumber < portionsCount &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
        </div>
    );
}
