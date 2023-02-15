import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import paginationFactory from 'react-bootstrap-table2-paginator';


const Tables = (props) => {
    const { SearchBar } = Search;

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            { from } - { to } of { size }
        </span>
    );

    const options = {
        paginationSize: 5,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: <i className={'far fa-angle-left fa-fw'}></i>,
        nextPageText: <i className={'far fa-angle-right fa-fw'}></i>,
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: false,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: props.data.length
        }] // A numeric array is also available. the purpose of above example is custom the text
    };


    return(
       <>
           {/*{console.log(props)}*/}
           {/* <ToolkitProvider*/}
           {/*     keyField='id'*/}
           {/*     data={ props.data }*/}
           {/*     columns={props.columns}*/}
           {/*     selectRow={ { mode: 'checkbox' } }*/}
           {/*     bordered={ false }*/}
           {/*     // search={ { searchFormatted: true } }*/}
           {/* >*/}
           {/*     {*/}
           {/*         basePropsBootstrap => {*/}
           {/*             return (*/}
           {/*                 <div>*/}
           {/*                     /!*<SearchBar { ...basePropsBootstrap.searchProps } />*!/*/}
           {/*                     <hr/>*/}
                                {/*<BootstrapTable
                                    keyField='id'
                                    data={ props.data }
                                    columns={props.columns}
                                    selectRow={ { mode: 'checkbox' } }
                                    bordered={ false }
                                    pagination={ paginationFactory() }
                                />*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*            }*/}
            {/*        }*/}
            {/*    }*/}
            {/*</ToolkitProvider>*/}
           <ToolkitProvider
               bootstrap5
               keyField='id'
               data={ props.data }
               columns={props.columns}
               selectRow={ { mode: 'checkbox' } }
               search={ { searchFormatted: true } }

           >
               {
                   propss => (
                       <div>
                           <SearchBar
                               { ...propss.searchProps }
                               placeholder="Search Users by Name, Email or Date"
                           />
                           <hr />
                           <BootstrapTable
                               { ...propss.baseProps }
                               bordered={ false }
                               hover
                              // pagination={ paginationFactory}
                           />
                       </div>
                   )
               }
           </ToolkitProvider>


       </>

    )
}

export default  Tables;
