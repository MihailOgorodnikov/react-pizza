import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);

    //Используем хук в котором переменная которая ссылается на контекст
    const {searchValue} = React.useContext(SearchContext);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //Для пагинации страницы
    //const [carrentPage, setCarrentPage] = React.useState(1);


    const onClickCategory = (id) => {
      dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
      
    };
    //&sortBy=${sortType.sort}&order=desc
    //https://62f4d5e7ac59075124c4e906.mockapi.io/items

    //Юзефикт для выводы пицц и слежения за пораметрами
    const fetchPizzas = () => {
      setIsLoading(true);
      
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sort.sortProperti.replace('-', '');
      const order = sort.sortProperti.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';


        axios.get(`https://62f4d5e7ac59075124c4e906.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    };

    //Тут мы будем парсить значения в строку командную 
    React.useEffect(() => {
      if (isMounted.current) {
        const queryString = qs.stringify({
        sortProperti: sort.sortProperti,
        categoryId,
        currentPage,
      });
      //navigate(`?${queryString}`);
      }
      isMounted.current = true;
    }, [categoryId, sort.sortProperti, currentPage]);

    //Парсим параметры со строки
    React.useEffect(() => {
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1));

        const sort = sortList.find((obj) => obj.sortProperti === params.sortProperti);

        dispatch(
          setFilters({
            ...params,
            sort,
          })
        );
        isSearch.current = true;
      }
    }, []);

    React.useEffect(() => {
      window.scrollTo(0, 0);
      if(!isSearch.current){
        fetchPizzas();
      }
      isSearch.current = false;
    }, [categoryId, sort.sortProperti, searchValue, currentPage]);


    //тут мы фильтруем массив когда что то написали в строку или просто выводи его 
    const pizzes = items.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>));
    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort/>
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {
                  isLoading ? sceletons : pizzes 
                }
              </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;