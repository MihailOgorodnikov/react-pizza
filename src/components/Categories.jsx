import React from "react";

function Categories() {

  //Создание массива и  его состояния
  const [activIndex, setActivIndex] = React.useState(0);

  //Массив категории  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


    return(
                   <div className="categories">
                    <ul>
                      {categories.map((value, i) => (<li key={i} onClick={() => setActivIndex(i)} className={activIndex == i ? "active" : ''}>{value}</li>))}
                    </ul>
                  </div>
    )
  }

export default Categories;