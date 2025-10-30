import { useMemo, useState } from 'react'
import css from './AllProductsPage.module.css'

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  supplier: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Moringa", category: "Medicine", stock: 12, supplier: "Square", price: 89.66 },
  { id: 2, name: "Antibiotic 250 mg", category: "Heart", stock: 19, supplier: "Acme", price: 34.16 },
  { id: 3, name: "Headache Relief", category: "Head", stock: 9, supplier: "Beximco", price: 53.76 },
  { id: 4, name: "Pharmacy", category: "Hand", stock: 14, supplier: "ACI", price: 28.57 },
  { id: 5, name: "Magnesium", category: "Leg", stock: 10, supplier: "Uniliver", price: 56.34 },
  { id: 6, name: "Baby Lotion", category: "Baby Care", stock: 7, supplier: "Nestle", price: 41.22 },
];
const AllProductsPage = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  // const [filter, setFilter] = useState('')
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)


 const rowsPerPage = 5;
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + rowsPerPage);

  const handleFilter = () => setCurrentPage(1);

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };




  return (
    <section className="pt-10 pb-5 ">
      <div className="  px-6">
        <h1 className="text-2xl font-bold visually-hidden">AllProductsPage</h1>
        {/* 🔍 Filter Section */}
        <div className=" md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Product Name"
              className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => setFilter(filter)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              {/* <Filter size={16} /> */}
              Filter
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {/* <Plus size={18} />  */}
            Add a new product
          </button>
        </div>

        {/* 🧾 Table Section */}
        <div className="bg-white rounded-2xl shadow ">
          <div className="bg-green-50  pl-[14px]  py-[14px] w-full">
            <h2 className="text-lg font-semibold ">All products</h2>
          </div>
           <div className="bg-white rounded-2xl shadow  overflow-x-auto ">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="">
              <tr className="text-gray-600 font-semibold">
                <th className="py-3 px-4 rounded-l-lg">Product Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Suppliers</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p, index) => (
                <tr
                  key={p.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index === filteredProducts.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4">{p.stock}</td>
                  <td className="py-3 px-4">{p.suppliers}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">${p.price}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <button className="p-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50">
                      {/* <Edit3 size={16} /> */}
                    </button>
                    <button className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50">
                      {/* <Trash2 size={16} /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        


          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 py-6">No products found</p>
          )}
        </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === page ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        {/* ➕ Modal for Add Product */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4">Add a new product</h3>
              <form className="flex flex-col gap-3">
                <input className="border rounded-lg px-3 py-2" placeholder="Product Name" />
                <select className="border rounded-lg px-3 py-2">
                  <option>Medicine</option>
                  <option>Head</option>
                  <option>Hand</option>
                  <option>Dental Care</option>
                  <option>Skin Care</option>
                  <option>Eye Care</option>
                  <option>Vitamins & Supplements</option>
                  <option>Orthopedic Products</option>
                  <option>Baby Care</option>
                </select>
                <input className="border rounded-lg px-3 py-2" placeholder="Stock" type="number" />
                <input className="border rounded-lg px-3 py-2" placeholder="Suppliers" />
                <input className="border rounded-lg px-3 py-2" placeholder="Price" type="number" />
                <button
                  type="button"
                  className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AllProductsPage
