import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        catagory: 'Salad',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {  
        event.preventDefault();
        const formData = new FormData();         
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("catagory",data.catagory)
        formData.append("image",image)
        const responce = await axios.post(`${url}/api/food/add`,formData);
        if (responce.data.success) {
             setData({
                name: '',
                description: '',
                price: '',
                catagory: 'Salad',
            })
            setImage(false)
            toast.success(responce.data.message)
        }
        else{
            toast.error(responce.data.message)
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="upload"
                        />
                        <input
                            type="file"
                            id="image"
                            hidden
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                        value={data.name}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                        value={data.description}
                        onChange={onChangeHandler}
                    ></textarea>
                </div>

                <div className="add-catagory-price">
                    <div className="add-catagory flex-col">
                        <p>Product Category</p>
                        <select
                            name="catagory"
                            required
                            value={data.catagory}
                            onChange={onChangeHandler}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            type="number"
                            name="price"
                            placeholder="₹500"
                            required
                            value={data.price}
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;
