import { FC } from 'react';

import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  pageCount: number;
}

export const Pagination: FC<PaginationProps> = ({onChangePage, pageCount, currentPage}) =>{

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      activeLinkClassName={styles.active}
      forcePage={currentPage - 1}
    />
)};