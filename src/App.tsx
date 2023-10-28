import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [item, setItem] = useState('');
  
  const [items, setItems] = useState<{ text: string; completed: boolean }[]>(
    JSON.parse(localStorage.getItem('groceryItems') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.trim() === '') {
      toast.error('Please Provide Value.');
    } else {
      const newItem = { text: item, completed: false };
      setItems([...items, newItem]);
      setItem('');
      toast.success('Item Added To The List!');
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    toast.success(`Item Deleted.`);
  };

  const toggleCompletion = (index: number) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  return (
    <div className="root">
      <section className="section-center">
        <div className='Toastify'>
        <ToastContainer position='top-center'/>
        </div>

        <form onSubmit={handleAddItem}>
          <h4>Grocery Bud</h4>
          <div className="form-control">
            <input
              type="text"
              className="form-input"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button type="submit" className="btn">
              Add Item
            </button>
          </div>
        </form>

        <div className="items">
            {items.map((item, index) => (
              <ul key={index}>
                <div className="single-item">
                  <input type="checkbox" checked={item.completed} onChange={() => toggleCompletion(index)}/>
                  <p style={{textTransform: 'capitalize', textDecoration: item.completed ? 'line-through' : 'none',}}>
                    {item.text}
                  </p>
                  <button className="btn remove-btn" type="button" onClick={() => handleRemoveItem(index)}>
                    Delete
                  </button>
                </div>
              </ul>
            ))}
          
        </div>
      </section>
    </div>
  );
}


export default App
