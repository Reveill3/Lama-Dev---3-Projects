const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: 'https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg',
    price: 74,
    cat: 'Dress',
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: 'https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg',
    price: 74,
    cat: 'Dress',
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: 'https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg',
    price: 40,
    cat: 'Sport',
  },
  {
    id: 3,
    name: 'Breitling Superocean Heritage',
    img: 'https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg',
    price: 200,
    cat: 'Luxury',
  },
  {
    id: 4,
    name: 'Casio Classic Resin Strap ',
    img: 'https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg',
    price: 16,
    cat: 'Sport',
  },
  {
    id: 5,
    name: 'Garmin Venu Smartwatch ',
    img: 'https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg',
    price: 74,
    cat: 'Casual',
  },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `<div class='product'>
      <img
        src=${product.img}
        alt=''
      />
      <span class='name'>${product.name}</span>
      <span class='priceText'>${'$' + product.price}</span>
    </div>`
    )
    .join('');
};

displayProducts(data);

searchInput.addEventListener('keyup', (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    const filteredProducts = data.filter((product) => {
      return product.name.toLowerCase().includes(value);
    });
    displayProducts(filteredProducts);
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((product) => product.cat);
  const categories = [
    'All',
    ...allCats.filter((cat, index) => allCats.indexOf(cat) === index),
  ];
  categoriesContainer.innerHTML = categories
    .map((cat) => `<span class="cat">${cat}</span>`)
    .join('');

  categoriesContainer.addEventListener('click', (e) => {
    const value = e.target.innerText.toLowerCase();
    if (value !== 'all') {
      const filteredProducts = data.filter((product) => {
        return product.cat.toLowerCase().includes(value);
      });
      displayProducts(filteredProducts);
    } else {
      displayProducts(data);
    }
  });
};

const setPrices = () => {
  const allPrices = data.map((product) => product.price);
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  priceRange.min = min;
  priceRange.max = max;
  priceRange.value = max;
  priceValue.innerText = '$' + max;

  priceRange.addEventListener('change', (e) => {
    const value = e.target.value;
    priceValue.innerText = '$' + value;
    const filteredProducts = data.filter((product) => {
      return product.price <= value;
    });
    displayProducts(filteredProducts);
  });
};

setPrices();

setCategories();
