import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category: 'general',  
  }
  static PropType ={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props){
      super(props);
      // console.log(super());
      console.log('Hello constructure From news component'); 
      this.state = {
        articles : [],
        loading: false,
        page: 1,
        totalResults : 0
      }
      document.title  = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async update(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data= await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
      // totalResults: parsedData.totalResults
      })
      this.props.setProgress(100);
    }
    async componentDidMount(){
      this.update();
    }
    // handleprevclick=async()=>{
    //   this.setState({ page: this.state.page-1});
    //   this.update();
    // }
    // handlenextclick=async()=>{      
    //   this.setState({ page: this.state.page+1 });
    //   this.update();
    // }
   fetchMoreData =() => {
     this.setState({
      page : this.state.page +1, })
      // this.update()
     setTimeout(async() => {
      const url = `https://newsapi.org/v2/top-headlines?country${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({
      articles :this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false,
      }); 
     }, 1500);
     this.props.setProgress(100);
    };  
  render() {
    console.log("render");
    return (      
      <>
          <h2 className="text-center mt-3">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
          {this.state.loading &&<Spinner/>}
          <InfiniteScroll dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        > 
          <div className='container-lg my-1'>
          <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4 col-sm-6" key={element.url}>
                      <Newsitem title={!element.title?element.title.slice(0, 45):""}
                      description={element.description?element.description.slice(0, 88):""}
                      imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                      source={element.source.name}/>
                    </div>
            })}           
            </div>
            </div>              
          </InfiniteScroll>          
      </>      
    )
  }
}
export default News;
