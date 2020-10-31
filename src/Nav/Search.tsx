
import React from 'react';
import './Search.css'

class Search extends React.Component {

    render() {
      return <>
        <div className="search-bar">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
              integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
            <div className="search-content">
                <input type="search" />
                <i className="fa fa-search"></i>
            </div>
        </div>
      </>
    }
}

export default Search;