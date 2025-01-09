// src/App.jsx
import React from 'react';
// import Header from './Components/Header';
// import ItemSection from './Components/ItemSection';
import Head from './Head';
import ItemSection from './ItemSection';
import Header from '../home/Header';

const Productss = () => {
  const appetizerProducts = [
    { name: 'Truffle infused white mushroom risotto balls', description: 'Creamy risotto with wild mushrooms and truffle oil,fried to a golden crisp', price: '₹2499', image: 'truffle.jpeg' },
    { name: 'Asparagus Wrapped in Prosciutto', description: 'Tender asparagus spears wrapped in savory prosciutto, drizzled with creamy Hollandaise.', price: '₹2399', image: 'asparagus.jpeg' },
    { name: 'Crispy polenta with Gorgonzola Cream', description: 'Golden, crispy polenta squares topped with Parmesan and fresh herbs.', price: '₹2299', image: 'polenta.jpeg' },
    { name: 'Avocado and Mango Salsa on Tortilla Chips' ,description : 'Fresh avocado and mango salsa served atop crispy tortilla chips.', price: '₹1999', image: 'wlcm.jpeg'},
    { name: 'Tempura Vegetables with Soy-Ginger Dip' ,description : 'Lightly battered and fried vegetables with a soy-ginger dipping sauce.  ', price: '₹2099', image: 'wlcm.jpeg'},
  ];

  const soupProducts = [
    { name: 'Roasted Butternut Squash and Maple Soup', description: 'Creamy Butternut squash soup with a touch of maple syrup and cream.', price: '₹2199', image: 'wlcm.jpeg' },
    { name: 'Creamy Porcini Mushroom Soup', description: 'A velvety soup made with porcini mushrooms, finished with a drizzle of truffle oil.', price: '₹2499', image: 'wlcm.jpeg' },
    { name: 'Pumpkin and Cinnamon Soup', description: 'Smooth pumpkin soup spiced with cinnamon and topped with a spiced crouton.', price: '₹2199', image: 'wlcm.jpeg' },
    { name: 'Roasted Tomato and Basil Soup with Parmesan Croutons', description: 'Tomato soup made with roasted tomatoes and basil, served with crispy Parmesan croutons.  ', price: '₹2199', image: 'wlcm.jpeg' },
    { name: 'Caramelized Onion and Truffle Soup', description: 'Sweet caramelized onions blended into a creamy soup with a touch of truffle oil ', price: '₹2499', image: 'wlcm.jpeg' },
    { name: 'Creamy Cauliflower Soup with Chive Oil', description: 'Creamy Cauliflower Soup with Chive Oil', price: '₹2199', image: 'wlcm.jpeg' },
    
  ];
  const harvestdelightsProducts = [
    { name: ' Grilled Eggplant with Pomegranate Molasses:', description: 'Grilled eggplant slices drizzled with sweet and tangy pomegranate molasses', price: '₹2199', image: 'wlcm.jpeg' },
    { name: 'Stuffed Bell Peppers with Wild Rice and Truffle Oil', description: 'Bell peppers filled with a luxurious wild rice mixture and truffle oil.  .', price: '₹2399', image: 'wlcm.jpeg' },
    { name: 'Vegetarian Sushi Rolls with Avocado and Pickled Ginger', description: 'Vegetarian Sushi Rolls with Avocado and Pickled Ginge', price: '₹2399', image: 'wlcm.jpeg' },
    { name: 'Stuffed Portobello Mushrooms with Truffle Cheese', description: 'Large portobello mushrooms stuffed with a truffle cheese mixture.  .  ', price: '₹2499', image: 'wlcm.jpeg' },
    { name: 'Vegetarian Moussaka with Cashew Cream', description: 'Layers of eggplant and potatoes with spiced tomato sauce, topped with cashew cream. ', price: '₹2499', image: 'wlcmn.jpeg' },
    { name: '  Asparagus and Parmesan Risotto', description: 'Creamy risotto with tender asparagus and rich Parmesan cheese.  ', price: '₹2399', image: 'wlcm.jpeg' },
    
  ];
  const saladProducts = [
    { name: ' Kale and Quinoa Salad with Lemon-Honey Dressing', description: 'Nutty quinoa and kale tossed with a bright lemon-honey dressing and fresh herbs.', price: '₹2399', image: 'wlcm.jpeg' },
    { name: 'Mediterranean Chickpea and Feta Salad', description: 'Chickpeas with cucumbers, tomatoes, olives, and feta cheese, drizzled with a herby vinaigrette.   .', price: '₹2199', image: 'wlcm.jpeg' },
    { name: ' Roasted Beet and Goat Cheese Salad with Walnut Vinaigrette', description: 'Roasted beets with creamy goat cheese, candied walnuts, and walnut vinaigrette.', price: '₹2399', image: 'wlcm.jpeg' },
    { name: 'Warm Mushroom Salad with Truffle Dressing', description: 'Sautéed mushrooms served over mixed greens with a truffle-infused dressing.  ' , price: '₹2399', image: 'wlcm.jpeg' },
    { name: 'Cucumber and Avocado Salad with Lime and Cilantro', description: 'Crisp cucumbers and creamy avocado with a refreshing lime and cilantro dressing.  ', price: '₹2099', image: 'wlcm.jpeg' },
    { name: '  Fennel and Orange Salad with Citrus Dressing:', description: 'Thinly sliced fennel and juicy oranges with a zesty citrus dressing.   ', price: '₹2399', image: 'wlcm.jpeg' },
    
  ];
  const sorbetProducts = [
    { name: ' Mango and Passion Fruit Sorbet:', description: 'A vibrant blend of mango and passion fruit in a refreshing sorbet.  ', price: '₹1899', image: 'wlcm.jpeg' },
    { name: 'Lemon and Basil Sorbet', description: 'A tangy lemon sorbet with a hint of fresh basil.  .', price: '₹1899', image: 'wlcm.jpeg' },
    { name: ' Raspberry and Rose Sorbet', description: 'A delicate sorbet with tart raspberries and a hint of rose water.  ', price: '₹1899', image: 'wlcm.jpeg' },
    { name: ' Peach and Amaretto Sorbet:', description: 'Smooth sorbet made with ripe peaches and a touch of Amaretto.  ', price: '₹1899', image: 'wlcm.jpeg' },
    { name: '   Mixed Berry and Lavender Sorbet', description: 'A blend of berries with a hint of calming lavender.    ', price: '₹1899', image: 'wlcm.jpg' },
    ];
  const maincourseProducts = [
    { name: ' Vegetarian Lasagna with Truffle Cream Sauce:', description: 'Layers of pasta, rich truffle cream sauce, and a medley of cheeses and vegetables.Served with Garlic Bread and a side of Mixed Green Salad.', price: '₹2799', image: 'wlcm.jpeg' },
    { name: 'Stuffed Acorn Squash with Wild Rice and Cranberries:', description: 'Acorn squash filled with a luxurious wild rice mixture and sweet cranberries.', price: '₹2599', image: 'wlcm.jpeg' },
    { name: ' Creamy Spinach and Ricotta Ravioli with Sage Butter Sauce', description: 'Ravioli filled with creamy spinach and ricotta, drizzled with sage-infused butter.', price: '₹2799', image: 'wlcm.jpeg' },
    { name: ' Mushroom and Truffle Risotto', description: 'Creamy risotto with wild mushrooms and a touch of truffle oil, finished with Parmesan.', price: '₹2799', image: 'wlcm.jpeg' },
    { name: '  Butternut Squash and Sage Gnocchi:', description: 'Soft gnocchi served with a rich butternut squash and sage sauce.  ', price: '₹2599', image: 'wlcm.jpeg' },
    { name: ' Zucchini Noodles with Avocado Pesto', description: 'Fresh zucchini noodles tossed in a creamy avocado pesto sauce, served with cherry tomatoes.', price: '₹2499', image: 'wlcm.jpeg' },
     
  ];
  const dessertProducts = [
    { name: 'Chocolate Fondant with Raspberry Coulis: ', description: ' Decadent chocolate cake with a molten center, served with a raspberry coulis and vanilla ice cream.', price: '₹2799', image: 'wlcm.jpeg' },
    { name: 'Tiramisu with Espresso Soaked Ladyfingers', description: 'Classic tiramisu with espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.  ', price: '₹2599', image: 'wlcm.jpeg' },
    { name: 'Lemon Meringue Tart', description: 'A zesty lemon curd tart with a light, fluffy meringue topping.  ', price: '₹2799', image: 'wlcm.jpeg' },
    { name: 'Pistachio and Rose Water Panna Cotta ', description: '  Creamy panna cotta flavored with pistachios and rose water, served with a pistachio crumble..', price: '₹2799', image: 'wlcm.jpeg' },
    { name: 'Warm Apple Crisp with Vanilla Ice Cream', description: 'Spiced apple crisp served warm with a scoop of vanilla ice cream.  ', price: '₹2599', image: 'wlcm.jpeg' },
    { name: 'Matcha Green Tea Cheesecake:', description: 'Creamy cheesecake infused with matcha green tea, served with a hint of fresh fruit. ', price: '₹2499', image: 'wlcm.jpeg' },
     
  ];

  return (
    <div className="bg-beige overflow-x-hidden font-serif bg-white text-black">
      <Header/>
      <div className="mt-4 flex justify-center space-x-4 pr-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">VEG</button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">NON-VEG</button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">VEGAN</button>
      </div>
      <ItemSection c
      title="Appetizers" description="The appetizer palate is meant to awaken the taste buds." products={appetizerProducts} />
      <ItemSection 
      title="Soups" description="Provides a warm and comforting start to the meal." products={soupProducts} />
      <ItemSection 
      title="Harvest Delights" description="highlights refined flavors with elegant presentations, featuring creative vegetarian dishes" products={harvestdelightsProducts} />
      <ItemSection 
      title="Salads" description="Provides a refreshing and flavorful break, featuring elegant salads that enhance the dining experience. " products={saladProducts} />
      <ItemSection 
      title="Sorbet" description=" Refreshes the palate before the main course, with light and invigorating flavors. " products={sorbetProducts} />
      <ItemSection 
      title="Main-Course" description=" The heart of the meal, offering rich and satisfying dishes that are both substantial and indulgent." products={maincourseProducts} />
      <ItemSection 
      title="Desserts" description=" Concludes the meal with a sweet and indulgent finale, featuring luxurious and delightful treats." products={dessertProducts} />
    </div>
  );
};

export default Productss;
