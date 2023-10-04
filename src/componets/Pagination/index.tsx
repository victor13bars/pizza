import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';

interface PaginationProps {
    onChangePage: (value: number) => void
    currentPage: number
}

const Pagination = ({currentPage, onChangePage}: PaginationProps) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
