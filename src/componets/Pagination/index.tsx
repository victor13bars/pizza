import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';

interface PaginationProps {
    onChangPage: (value: number) => void
}

const Pagination = ({onChangPage}: PaginationProps) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangPage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;