const tshirtsData = [
  { title: 'Blue T-Shirt', image: 'images/blue-t-shirt.jpg', price: 7.99, stock: 40, quantity: 1 },
  { title: 'Bright Purple T-Shirt', image: 'images/bright-purple-t-shirt.jpg', price: 5.99, stock: 1, quantity: 1 },
  { title: 'Cobalt Blue T-Shirt', image: 'images/cobalt-blue-t-shirt.jpg', price: 9.99, stock: 50, quantity: 1 },
  { title: 'Green T-Shirt', image: 'images/green-t-shirt.jpg', price: 6.99, stock: 0, quantity: 1 },
  { title: 'Grey T-Shirt', image: 'images/blue-t-shirt.jpg', price: 4.99, stock: 22, quantity: 1 },
  { title: 'Light Green T-Shirt', image: 'images/light-green-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 },
  { title: 'Purple T-Shirt', image: 'images/purple-t-shirt.jpg', price: 7.99, stock: 30, quantity: 1 },
  { title: 'Red T-Shirt', image: 'images/red-t-shirt.jpg', price: 6.99, stock: 3, quantity: 1 },
  { title: 'Teal T-Shirt', image: 'images/teal-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 }
];

function TShirt({ tshirt, onBuy, onQuantityChange }) {
  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{tshirt.title}</h3>
      <img src={tshirt.image} alt={tshirt.title} width="100" />
      <p>Price: ${tshirt.price.toFixed(2)}</p>
      {tshirt.stock > 0 ? (
        <div>
          <p>In Stock: {tshirt.stock}</p>
          <select value={tshirt.quantity} onChange={e => onQuantityChange(tshirt.title, parseInt(e.target.value))}>
            {Array.from({ length: tshirt.stock }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button onClick={() => onBuy(tshirt.title)}>Buy</button>
        </div>
      ) : (
        <p style={{ color: 'red' }}>Out of Stock</p>
      )}
    </div>
  );
}

function App() {
  const [tshirts, setTshirts] = React.useState(tshirtsData);

  function handleBuy(title) {
    setTshirts(prevTshirts =>
      prevTshirts.map(t => {
        if (t.title === title && t.stock >= t.quantity) {
          return { ...t, stock: t.stock - t.quantity };
        }
        return t;
      })
    );
  }

  function handleQuantityChange(title, quantity) {
    setTshirts(prevTshirts =>
      prevTshirts.map(t => {
        if (t.title === title) {
          return { ...t, quantity: quantity };
        }
        return t;
      })
    );
  }

  return (
    <div>
      <h1>T-Shirt Store</h1>
      <div>
        {tshirts.map(tshirt => (
          <TShirt
            key={tshirt.title}
            tshirt={tshirt}
            onBuy={handleBuy}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
