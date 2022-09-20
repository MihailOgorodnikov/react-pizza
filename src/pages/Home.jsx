import React from "react";


import Categories from '../components/Categories'
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //Стейты из категориес
    const [categoryId, setCategoryId] = React.useState(0);
    //Для пагинации страницы
    const [carrentPage, setCarrentPage] = React.useState(1);
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
      const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
          `https://62f4d5e7ac59075124c4e906.mockapi.io/items?page=${carrentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => res.json())
        .then((arr) => {
            setItems(arr);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, carrentPage]);

    //тут мы фильтруем массив когда что то написали в строку или просто выводи его 
    const pizzes = items.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>));
    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onClickSort={(i) => setSortType(i)}/>
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {
                  isLoading ? sceletons : pizzes 
                }
              </div>
            <Pagination onChangePage={(number) => setCarrentPage(number)}/>
        </div>
    );
};

export default Home;