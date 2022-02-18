import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }
   constructor(){
       super();
       this.state = {
           articles: [],
           page: 1,
           totalResults: 0,
           loading: false
       }
   } 
   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
async updateNews(){
    try{
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
        this.props.setProgress(100);
    }catch(error){
        console.log(error);
    }
    
    }
    
   async componentDidMount(){
        this.updateNews();
    }
    fetchMoreData = async()=>{
        try{
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page+1
        })
        }catch(error){
            console.log(error);
        }
    }
    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1},()=>{
            this.updateNews();
        });
    }
    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1}, ()=>{
            this.updateNews();
        });
    }

  render() {
    const {articles} = this.state;
    return (
        <>
            <h2 className='text-center' style={{marginTop: '90px'}}>NewsZilla - Top {this.capitalizeFirstLetter(this.props.category) === "General"? "":this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
                >
            <div className="container">
            <div className="row">
                {articles.map((item)=>{
                    return <NewsItem key={item.url} title={item.title} description={item.description} imageUrl={item.urlToImage} newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name} category={this.props.category} />
                })}
            </div>
            </div>
            </InfiniteScroll>
        </>
    )
  }
}

export default News
// ${this.props.apiKey}