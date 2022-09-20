import React from "react";

import ReactPaginate from "react-paginate";

import styles from "./Pagination.modules.scss";


const Pagination = ({ onChangePage }) => {
    return( 
    <ReactPaginate
        className="root"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event)=> onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    );
};

export default Pagination;