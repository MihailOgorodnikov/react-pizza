import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

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
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const {items, status} = useSelector((state) => state.pizza);
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);

    //Используем хук в котором переменная которая ссылается на контекст
    const {searchValue} = React.useContext(SearchContext);


    const onClickCategory = (id) => {
      dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
      
    };


    //Юзефикт для выводы пицц и слежения за пораметрами
    const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sort.sortProperti.replace('-', '');
      const order = sort.sortProperti.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';

         dispatch(
           fetchPizzas({
              category,
              sortBy,
              order,
              search,
              currentPage
           })
          );
      
          window.scrollTo(0, 0);
    };

    //Тут мы будем парсить значения в строку командную 
    React.useEffect(() => {
      if (isMounted.current) {
        const params = {
          categoryId: categoryId > 0 ? categoryId : null,
          sortProperti: sort.sortProperti,
          currentPage,
        };

        const queryString = qs.stringify(params, {skipNulls: null});
        navigate(`/?${queryString}`);
      }
     
      if (window.location.search){
        fetchPizzas();
      }
    }, [categoryId, sort.sortProperti, searchValue, currentPage]);

    React.useEffect(() => {
      getPizzas();
    }, [categoryId, sort.sortProperti, searchValue, currentPage]);
  //categoryId, sort.sortProperti, searchValue, currentPage

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
                  status == 'loading' ? sceletons : pizzes 
                }
              </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;