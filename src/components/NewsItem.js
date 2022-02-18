import React, { useEffect, useState } from 'react'

const NewsItem = (props) => {
    const [catColor, setCatColor] = useState("primary");
    const changeCatColor = ()=>{
        let category = props.category;
        if(category === "general"){
            setCatColor("primary");
        }
        else if(category === "business"){
            setCatColor("secondary");
        }
        else if(category === "entertainment"){
            setCatColor("warning");
        }
        else if(category === "health"){
            setCatColor("danger");
        }
        else if(category === "science"){
            setCatColor("info");
        }
        else if(category === "sports"){
            setCatColor("success");
        }
        else if(category === "technology"){
            setCatColor("dark");
        }
    }
    useEffect(()=>{
        changeCatColor();
    }, [catColor])
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3 col-md-4'>
        <div className="card">
            <div style={{    
                display: 'flex',          
                position: 'absolute',
                right: '0'}}>
            <span className={`badge rounded-pill bg-${catColor}`}>
                {source}
            </span>
            </div>
            <img src={!imageUrl?"https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
