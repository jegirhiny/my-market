import "./landing.styles.css";
import { useEffect, useState, useRef } from "react";
import { getRangeOfItems } from "../../utility/item-api";
import { LuLoader } from "react-icons/lu";
import Navigation from "../navigation/navigation.component";
import ItemCard from "../item-card/item-card.component";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const loading = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      loading.current = true;
      const res = await getRangeOfItems("", skip, take);
      setItems(res.data.items);
      loading.current = false;
    };

    fetchData();
  }, [searchItems]);

  const getItemArr = (arr) => {
    const sellingHTML = [];

    for (let i = 0; i < arr.length; i += 5) {
      sellingHTML.push(
        <div key={i} className="item-row">
          {arr.slice(i, i + 5).map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      );
    }

    return sellingHTML;
  };

  const handleFetchedData = (fetchedItems) => {
    if (fetchedItems.length === 0) {
      setSearchItems(null);
    } else {
      setSearchItems(fetchedItems);
    }
  };

  const setIsLoading = (isLoading) => {
    loading.current = isLoading;
  };

  return (
    <div className="full">
      <Navigation
        callbackFunctions={{ handleFetchedData, setIsLoading }}
        numCartItems={localStorage.getItem("numCartItems") || 0}
      />
      {loading.current ? (
        <div className="item-loading">
          <LuLoader size={"3rem"} className="rotate" />
          <h2 style={{ marginLeft: "15px" }}>LOADING...</h2>
        </div>
      ) : (
        <div className="item-container">
          {!searchItems ? (
            <h1>no items found</h1>
          ) : searchItems.length > 0 ? (
            getItemArr(searchItems)
          ) : (
            getItemArr(items)
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;
