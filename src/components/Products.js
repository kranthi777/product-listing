import React, {useEffect, useState} from 'react';
import data from '../asserts/data.json';
import Header from './Header';

const Products = () => {
  const [list, setList] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState("");
  
  useEffect(()=>{
    const handleOnScroll = () => {
      if (scrolling) {
        return;
      }
      const loadMore = document.getElementById('loadMore');
      const topArrow = document.getElementById('topArrow');

      //show/hide top arrow (Scroll To Top) element
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topArrow.style.display = "block";
      } else {
        topArrow.style.display = "none";
      }

      //Infinite scroll calculation
      const loadMoreOffset = loadMore.offsetTop + loadMore.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      let bottomOffset = 20;
      if (pageOffset > loadMoreOffset - bottomOffset) {
        setPageNumber(pageNumber=>pageNumber + 1);
        setScrolling(true);
      }
    }
    window.addEventListener('scroll', handleOnScroll);
    
    return () => window.removeEventListener('scroll', handleOnScroll);
  },[scrolling]);

  useEffect(()=>{
    loadList();
  },[pageNumber])


  const loadList = () => {
    let i;
    let fillList = [];
    let length = pageNumber * 12;
    if (inputValue) return;
    for (i = 0; i < length; i++) {
      fillList[i] = data[i];
    }
    setList([...new Set([...list, ...fillList])]);

    //checking if totalPages is greater than current pageNumber
    if (data.length/12 > pageNumber) {
      setScrolling(false);
    }
  }

  const onSearch = (evt) => {
    let value = evt.target.value;
    let filteredData = [];
    setInputValue(value);
    if (value === "") {
      loadList();
    } else {
      filteredData = data.filter((item)=>{
        return item.title.match(value)
      });
      setList(filteredData);
    }
  }

  let displayItems = list && list.map((item)=>{
    return (
      <div key={item.id} className="col-6 col-sm-3">
        <a href={"https://www.nykaafashion.com/" + item.actionUrl} className="card">
          <img className="card-img-top img-responsive" src={item.imageUrl} alt={item.title} />
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            {item.discount !== 0 &&
            <span className="price discounted-price">Rs.{item.discountedPrice}</span>
            }
            <span className={'price ' + (item.discount !== 0 ?'price-strike':'')}>Rs.{item.price}</span>
            {item.discount !== 0 &&
            <span className="price-strike discount-percent">({item.discount}% OFF)</span>
            }
            <div className="sizes">
              {item.sizeVariation.map((size)=>{
                return <span className="size-variant" key={size.id}>{size.title}</span>
              })}
            </div>
          </div>
        </a>
      </div>
    )
  });

  return (
  <div className="products-wrapper">
    <Header onSearch={onSearch} inputValue={inputValue} />
    <div className="row">
      {displayItems}
    </div>
    <div id="loadMore"></div>
  </div>
  );
}

export default Products;