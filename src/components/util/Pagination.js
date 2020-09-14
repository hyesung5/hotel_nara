import React, {Component} from 'react';
import _ from 'lodash';

class Pagination extends Component{

    render(){
    const { itemsCount, pageSize, currentPage, onPgaeChange, start, end, handleMovePage}= this.props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if(pageCount === 1) return null;

    // const pages = _.range(1, pageCount +1);

    const array = [];
    for(let i =0; i < pageCount; i++){
        array.push(i+ 1);
    }

    const pages = array.slice(start, end);

    return(
        <nav        style={{textAlign:"center", paddingBottom :"1px"}}>
            <ul>
            {/* <li>
        <button className="page-link"  onClick={()=> {onPgaeChange(1); }}> 
            처음
        </button>
                </li> */}
                <li>
        <button className="page-link"  onClick={()=> {
            if(currentPage ===1) return alert('첫번째 페이지');
            if(currentPage % 10 === 1){
                const s= start -10;
                const e= end -10;
                handleMovePage(s, e);
            }
            onPgaeChange(currentPage -1 );
        }

        }> 
            이전
        </button>
                </li>
                {pages.map (page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"} 
                    style={{ cursor: "pointer", padding: 0}}
                    >
                        <button className="page-link" onClick={()=> onPgaeChange(page)}> {page}</button>
                    </li>
                ))}
                                <li>
        <button className="page-link" onClick={()=> {
           if(currentPage ===pageCount) return alert('마지막 페이지');
            if(currentPage % 10 === 0){
                const s= start +10;
                const e= end +10;
                handleMovePage(s, e);

            }

                onPgaeChange(currentPage +1 );
          
        }

        }> 
            다음
        </button>
                </li>
            </ul>
        </nav>
    )
}

}

export default Pagination;
