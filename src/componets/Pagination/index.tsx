import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';

interface PaginationProps {
    onChangePage: (value: number) => void
    currentPage: number
}

const Pagination: FC<PaginationProps> = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={2}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
