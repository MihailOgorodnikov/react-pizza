import React from "react";


import Categories from '../components/Categories'
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    

    //https://62f4d5e7ac59075124c4e906.mockapi.io/items

    React.useEffect(() => {
        fetch("https://62f4d5e7ac59075124c4e906.mockapi.io/items")
        .then((res) => res.json())
        .then((arr) => {
            setItems(arr);
            setIsLoading(false);
        });
    }, []);


    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {
                  isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                   : items.map((obj) => 
                  (<PizzaBlock key={obj.id} {...obj}/>)) 
                }
              </div>
        </>
    );
};

export default Home;