import React from 'react'

const Pagination = ({totalTasks, currentPage, paginate}) => {
    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(totalTasks / 3); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className="pagination">
            {pageNumbers.map(number => (
                
                <a href={"#" + number} key={number} onClick={() => paginate(number)} className = {`${currentPage === number ? "active" : ""}`}>
                    {number}
                </a>
                
            ))

            }
            </div>
        </nav>
    )
}

export default Pagination
