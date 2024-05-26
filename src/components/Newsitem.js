import React from 'react';
const Newsitem =(props)=> {
   let {title, description, imageUrl , newsUrl , author, date , source} = props;
    return (
      <div className='my-3'>
          <div className="card">
              <div className='badge-set'>
                <span className="badge rounded-pill bg-danger"> 
                  {source}
                </span>
              </div>
                <img src={!imageUrl?"https://c.ndtvimg.com/2021-03/ua855tco_quad-meeting-bloomberg_625x300_31_March_21.jpg" :imageUrl}  alt="..." className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className='text-muted'> By {!author?"Unknown":author} on {new Date(date).toString()}</small></p>
                    <a rel='noreferrer' href={`${newsUrl}`} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    )
}
export default Newsitem;
