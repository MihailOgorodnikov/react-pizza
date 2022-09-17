import React from "react";


import Categories from '../components/Categories'
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //Стейты из категориес
    const [categoryId, setCategoryId] = React.useState(0);
    //Стейты из сортеровки
    const [sortType, setSortType] = React.useState({
      name: 'популярности',
      sort: 'rating'
    });
    
    //&sortBy=${sortType.sort}&order=desc
    //https://62f4d5e7ac59075124c4e906.mockapi.io/items

    React.useEffect(() => {
      setIsLoading(true);
      
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sortType.sort.replace('-', '');
      const order = sortType.sort.includes('-') ? 'asc' : 'desc';

        fetch(
          `https://62f4d5e7ac59075124c4e906.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
        .then((res) => res.json())
        .then((arr) => {
            setItems(arr);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onClickSort={(i) => setSortType(i)}/>
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {
                  isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                   : items.map((obj) => 
                  (<PizzaBlock key={obj.id} {...obj}/>)) 
                }
              </div>
        </div>
    );
};

export default Home;