
const [products, setProducts] = useState([{}]);
const getProducts = async () => {
    try {
      const response = await fetch("/products");
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
export const handleSearchClick =  (searchedVal) =>{
    const filterBySearch = products.filter((item) =>{
      if(item.name.toLowerCase().includes(searchedVal.toLowerCase())){
        return item;
      }
    })
    setProducts(filterBySearch);
}