import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Admin.scss";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // --- Pagination States for Products within a Category ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductsInCategory, setTotalProductsInCategory] = useState(0);
  const productsPerPage = 10; // Matches backend limit

  // --- States for ADD Product Modal ---
  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });
  const [formSubmitError, setFormSubmitError] = useState(null);

  // --- States for EDIT Product Modal ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormError, setEditFormError] = useState(null);
  const [editImageFiles, setEditImageFiles] = useState([]);

  // --- States for Product Detail Modal ---
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);
  const [productDetailError, setProductDetailError] = useState(null);

  // --- Fetch Categories for Categories Tab & Summary ---
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
        const response = await axios.get("http://localhost:3000/category");
        setCategories(response.data);
        setTotalCategories(response.data.length);
      } catch (err) {
        setCategoriesError("Failed to fetch categories. Please try again.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesData();
  }, []);

  // --- Fetch ALL Products for Dashboard Summary ---
  const fetchAllProductsForSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const response = await axios.get("http://localhost:3000/product");
      const totalCount =
        Array.isArray(response.data) &&
        response.data.length === 2 &&
        typeof response.data[1] === "number"
          ? response.data[1]
          : response.data.length;
      setTotalProducts(totalCount);
    } catch (err) {
      setSummaryError("Failed to fetch product summary. Please try again.");
      console.error("Error fetching all products for summary:", err);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProductsForSummary();
  }, []);

  // --- Fetch Products when a Category is Selected (for categories tab) ---
  const fetchProductsByCategory = useCallback(
    async (pageToFetch = 1) => {
      if (selectedCategory) {
        setLoadingProducts(true);
        setProductsError(null);
        try {
          const response = await axios.get(
            `http://localhost:3000/product?categoryId=${selectedCategory.id}&page=${pageToFetch}`
          );
          const [productsData, totalCount] = response.data;
          setProducts(productsData);
          setTotalProductsInCategory(totalCount);
          setCurrentPage(pageToFetch);
        } catch (err) {
          setProductsError(
            `Failed to fetch products for ${selectedCategory.name}.`
          );
          console.error("Error fetching products:", err);
        } finally {
          setLoadingProducts(false);
        }
      } else {
        setProducts([]);
        setTotalProductsInCategory(0);
        setCurrentPage(1);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchProductsByCategory(1);
  }, [selectedCategory, fetchProductsByCategory]);

  // --- Handlers for Product Add Form ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleProductSubmit = async () => {
    if (!selectedCategory) {
      setFormSubmitError("Please select a category before adding a product.");
      return;
    }
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      formData.images.length === 0
    ) {
      setFormSubmitError(
        "Please fill all product fields and upload at least one image."
      );
      return;
    }

    setFormSubmitError(null);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setFormSubmitError(
        "Authentication token not found. Please log in again."
      );
      setAuthenticated(false);
      navigate("/login");
      return;
    }

    const productPayload = new FormData();
    productPayload.append("name", formData.name);
    productPayload.append("description", formData.description);
    productPayload.append("price", formData.price);
    productPayload.append("categoryId", selectedCategory.id.toString());

    formData.images.forEach((imageFile) => {
      productPayload.append("images", imageFile);
    });

    try {
      await axios.post("http://localhost:3000/product", productPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
      setFormData({ name: "", description: "", price: "", images: [] });
      setShowProductFormModal(false);
      fetchProductsByCategory(1);
      fetchAllProductsForSummary();
    } catch (error) {
      console.error(
        "Error submitting product:",
        error.response?.data || error.message
      );
      setFormSubmitError(
        error.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    }
  };

  // --- NEW: Handlers for Product Edit Form ---
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditImageFiles([]);
    setEditFormError(null);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setEditImageFiles([...editImageFiles, ...files]);
  };

  const removeEditImage = (index, isNewFile = false) => {
    if (isNewFile) {
      setEditImageFiles(editImageFiles.filter((_, i) => i !== index));
    } else {
      setEditingProduct({
        ...editingProduct,
        images: editingProduct.images.filter((_, i) => i !== index),
      });
    }
  };

  // --- Handlers for Product Edit Form ---
// ...
const handleEditSubmit = async () => {
    if (
      !editingProduct.name ||
      !editingProduct.description ||
      !editingProduct.price
    ) {
      setEditFormError("Please fill all required fields.");
      return;
    }
    setEditFormError(null);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setEditFormError("Authentication token not found. Please log in again.");
      setAuthenticated(false);
      navigate("/login");
      return;
    }

    // Use a clean object for text fields
    const updatedData = {
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      categoryId: editingProduct.categoryId,
    };
    
    // Create a new FormData object for the PATCH request
    const productPayload = new FormData();
    productPayload.append("name", updatedData.name);
    productPayload.append("description", updatedData.description);
    productPayload.append("price", updatedData.price);
    productPayload.append("categoryId", updatedData.categoryId);

    // Append images if there are any new ones
    editImageFiles.forEach((imageFile) => {
      productPayload.append("images", imageFile);
    });

    // Handle existing images to be kept
    productPayload.append(
      "existingImages",
      JSON.stringify(editingProduct.images)
    );

    try {
      await axios.patch(
        `http://localhost:3000/product/${editingProduct.id}`,
        productPayload, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for image updates
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated successfully!");
      setShowEditModal(false);
      setEditingProduct(null);
      setEditImageFiles([]);
      fetchProductsByCategory(currentPage);
      fetchAllProductsForSummary();
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
      setEditFormError(
        error.response?.data?.message ||
          "Failed to update product. Please try again."
      );
    }
  };

  // --- DELETE Product Handler ---
  const handleDeleteProduct = async (productId, productName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${productName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      setAuthenticated(false);
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Product "${productName}" deleted successfully!`);
      const newTotalProductsInCategory = totalProductsInCategory - 1;
      const newTotalPages = Math.ceil(
        newTotalProductsInCategory / productsPerPage
      );
      let pageToRefetch = currentPage;
      if (currentPage > newTotalPages && currentPage > 1) {
        pageToRefetch = newTotalPages;
      }
      fetchProductsByCategory(pageToRefetch);
      fetchAllProductsForSummary();
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          `Failed to delete product "${productName}". Please try again.`
      );
    }
  };

  // --- Handle Product Card Click to Show Details ---
  const handleProductCardClick = async (productId) => {
    setLoadingProductDetail(true);
    setProductDetailError(null);
    setSelectedProductDetail(null);
    setShowProductDetailModal(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/product/${productId}`
      );
      setSelectedProductDetail(response.data);
    } catch (err) {
      setProductDetailError(
        "Failed to fetch product details. Please try again."
      );
      console.error("Error fetching product details:", err);
    } finally {
      setLoadingProductDetail(false);
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setAuthenticated(false);
    navigate("/login");
  };

  // --- Sidebar Navigation Handler ---
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCategory(null);
    setShowProductFormModal(false);
    setFormSubmitError(null);
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormError(null);
    setCurrentPage(1);
    setTotalProductsInCategory(0);
    setSelectedProductDetail(null);
    setShowProductDetailModal(false);
    setLoadingProductDetail(false);
    setProductDetailError(null);
  };

  // --- Pagination Logic ---
  const totalPages = Math.ceil(totalProductsInCategory / productsPerPage);
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const handleNextPage = () => {
    if (canGoNext) {
      fetchProductsByCategory(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (canGoPrev) {
      fetchProductsByCategory(currentPage - 1);
    }
  };

  // --- Render Content Based on Active Tab ---
  const renderMainContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-summary">
            <h1>Dashboard Overview</h1>
            <p>Welcome to your admin dashboard. Here's a quick summary:</p>
            {summaryLoading && <p>Loading summary data...</p>}
            {summaryError && <p style={{ color: "red" }}>{summaryError}</p>}
            {!summaryLoading && !summaryError && (
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>Total Categories</h3>
                  <p className="summary-count">{totalCategories}</p>
                </div>
                <div className="summary-card">
                  <h3>Total Products</h3>
                  <p className="summary-count">{totalProducts}</p>
                </div>
              </div>
            )}
            <p style={{ marginTop: "20px" }}>
              Use the sidebar to navigate to other sections.
            </p>
          </div>
        );
      case "categories":
        return (
          <div>
            <h1>Product Categories</h1>
            {loadingCategories && <p>Loading categories...</p>}
            {categoriesError && (
              <p style={{ color: "red" }}>{categoriesError}</p>
            )}
            {!loadingCategories &&
              !categoriesError &&
              categories.length === 0 && (
                <p>No categories found. Add some from the backend!</p>
              )}

            <div className="category-grid">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <img
                    src={`${
                      cat.image
                        ? `http://localhost:3000/${cat.image}`
                        : "https://via.placeholder.com/300x200?text=No+Category+Image"
                    }`}
                    alt={cat.name}
                  />
                  <div className="category-info">
                    <p>{cat.productCount || 0} Products</p>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "allProducts":
        return (
          <div>
            <h1>All Products</h1>
            <p>This section will display all products across all categories.</p>
            <div className="product-grid">
              {!loadingProducts &&
                products.length > 0 &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductCardClick(product.id)}
                  >
                    <img
                      src={`${
                        product.images && product.images.length > 0
                          ? `http://localhost:3000/${product.images[0]}`
                          : "https://via.placeholder.com/150x150?text=No+Product+Image"
                      }`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-details">
                      <h3>
                        {product.name}{" "}
                        <span className="price">
                          $
                          {product.price !== undefined && product.price !== null
                            ? parseFloat(product.price).toFixed(2)
                            : "N/A"}
                        </span>
                      </h3>
                      <p>{product.description}</p>
                      {product.category && (
                        <p>Category: {product.category.name}</p>
                      )}
                      <div className="actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(product);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id, product.name);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h1>Settings</h1>
            <p>Manage your admin panel settings here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Tailor Stitch Admin</h2>
        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => handleTabChange("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => handleTabChange("categories")}
          >
            Categories
          </button>
          <button
            className={activeTab === "allProducts" ? "active" : ""}
            onClick={() => handleTabChange("allProducts")}
          >
            All Products
          </button>
          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => handleTabChange("settings")}
          >
            Settings
          </button>
          <button className="logout-sidebar-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        <div className="admin-footer">
          <p>
            <strong>Admin User</strong>
          </p>
          <p>admin@tailorstitch.com</p>
        </div>
      </aside>

      <main className="main-content">
        {selectedCategory && activeTab === "categories" ? (
          <div>
            <button
              className="back-btn"
              onClick={() => {
                setSelectedCategory(null);
                setShowProductFormModal(false);
              }}
            >
              &larr; Back to Categories
            </button>
            <h1>{selectedCategory.name}</h1>
            <p>
              {selectedCategory.description} • {totalProductsInCategory}{" "}
              products
            </p>
            <button
              className="add-product"
              onClick={() => setShowProductFormModal(true)}
            >
              + Add Product
            </button>

            {/* --- Add Product Modal --- */}
            <Dialog
              header={`Add Product to ${selectedCategory.name}`}
              visible={showProductFormModal}
              style={{ width: "50vw", maxWidth: "600px" }}
              onHide={() => {
                setShowProductFormModal(false);
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  images: [],
                });
                setFormSubmitError(null);
              }}
              modal
            >
              <div className="product-form" style={{ padding: "20px" }}>
                {formSubmitError && (
                  <p style={{ color: "red", marginBottom: "15px" }}>
                    {formSubmitError}
                  </p>
                )}

                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="productName"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Product Name:
                  </label>
                  <input
                    id="productName"
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="productDescription"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Description:
                  </label>
                  <textarea
                    id="productDescription"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="admin-input"
                  ></textarea>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="productPrice"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Price:
                  </label>
                  <input
                    id="productPrice"
                    type="text"
                    name="price"
                    placeholder="e.g., 29.99"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="productImages"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Upload Images:
                  </label>
                  <input
                    id="productImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="admin-input"
                    style={{ padding: "8px" }}
                  />
                </div>

                <div
                  className="preview-gallery"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {formData.images.map((img, i) => (
                    <div
                      key={i}
                      className="preview-item"
                      style={{
                        position: "relative",
                        border: "1px solid #ddd",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${i}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "2px",
                        }}
                      />
                      <button
                        onClick={() => removeImage(i)}
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          background: "#e74c3c",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          lineHeight: "1",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleProductSubmit}
                  className="btnn"
                  style={{ backgroundColor: "#28a745", width: "100%" }}
                >
                  Submit Product
                </button>
              </div>
            </Dialog>

            <h3>Products in {selectedCategory.name}</h3>
            {loadingProducts && <p>Loading products for this category...</p>}
            {productsError && <p style={{ color: "red" }}>{productsError}</p>}
            {!loadingProducts && !productsError && products.length === 0 && (
              <p>
                No products found for this category. Use the "+ Add Product"
                button to add one!
              </p>
            )}

            <div className="product-grid">
              {!loadingProducts &&
                products.length > 0 &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductCardClick(product.id)}
                  >
                    <img
                      src={`${
                        product.images && product.images.length > 0
                          ? `http://localhost:3000/${product.images[0]}`
                          : "https://via.placeholder.com/150x150?text=No+Product+Image"
                      }`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-details">
                      <h3>
                        {product.name}{" "}
                        <span className="price">
                          $
                          {product.price !== undefined && product.price !== null
                            ? parseFloat(product.price).toFixed(2)
                            : "N/A"}
                        </span>
                      </h3>
                      <p>{product.description}</p>
                      {product.category && (
                        <p>Category: {product.category.name}</p>
                      )}
                      <div className="actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(product);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id, product.name);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={!canGoPrev}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={!canGoNext}>
                  Next
                </button>
              </div>
            )}

            {/* --- Product Detail Modal --- */}
            <Dialog
              header={
                selectedProductDetail
                  ? selectedProductDetail.name
                  : "Product Details"
              }
              visible={showProductDetailModal}
              style={{ width: "60vw", maxWidth: "800px" }}
              onHide={() => {
                setShowProductDetailModal(false);
                setSelectedProductDetail(null);
                setProductDetailError(null);
              }}
              modal
            >
              {loadingProductDetail && <p>Loading product details...</p>}
              {productDetailError && (
                <p style={{ color: "red" }}>{productDetailError}</p>
              )}
              {selectedProductDetail && !loadingProductDetail && (
                <div className="product-detail-modal-content">
                  <div className="main-info">
                    <h2>{selectedProductDetail.name}</h2>
                    <p className="price-display">
                      ${parseFloat(selectedProductDetail.price).toFixed(2)}
                    </p>
                    <p>{selectedProductDetail.description}</p>
                    {selectedProductDetail.category && (
                      <p className="category-link">
                        Category: {selectedProductDetail.category.name}
                      </p>
                    )}
                  </div>
                  {selectedProductDetail.images &&
                    selectedProductDetail.images.length > 0 && (
                      <div className="image-gallery">
                        {selectedProductDetail.images.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={`http://localhost:3000/${imgUrl}`}
                            alt={`${selectedProductDetail.name} Image ${
                              index + 1
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  {selectedProductDetail.images &&
                    selectedProductDetail.images.length === 0 && (
                      <p style={{ textAlign: "center", color: "#888" }}>
                        No images available for this product.
                      </p>
                    )}
                </div>
              )}
            </Dialog>
            {/* --- NEW: Product Edit Modal --- */}
            <Dialog
              header={`Edit Product: ${editingProduct?.name}`}
              visible={showEditModal}
              style={{ width: "50vw", maxWidth: "600px" }}
              onHide={() => {
                setShowEditModal(false);
                setEditingProduct(null);
                setEditImageFiles([]);
                setEditFormError(null);
              }}
              modal
            >
              {/* This is the key fix: only render the form if editingProduct is not null */}
              {editingProduct && (
                <div className="product-form" style={{ padding: "20px" }}>
                  {editFormError && (
                    <p style={{ color: "red", marginBottom: "15px" }}>
                      {editFormError}
                    </p>
                  )}

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="editProductName"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Product Name:
                    </label>
                    <input
                      id="editProductName"
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={editingProduct.name}
                      onChange={handleEditInputChange}
                      className="admin-input"
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="editProductDescription"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Description:
                    </label>
                    <textarea
                      id="editProductDescription"
                      name="description"
                      placeholder="Enter product description"
                      value={editingProduct.description}
                      onChange={handleEditInputChange}
                      rows="4"
                      className="admin-input"
                    ></textarea>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="editProductPrice"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Price:
                    </label>
                    <input
                      id="editProductPrice"
                      type="text"
                      name="price"
                      placeholder="e.g., 29.99"
                      value={editingProduct.price}
                      onChange={handleEditInputChange}
                      className="admin-input"
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Existing Images:
                    </label>
                    {editingProduct.images && (
                      <div
                        className="preview-gallery"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {editingProduct.images.map((imgUrl, i) => (
                          <div
                            key={`existing-${i}`}
                            className="preview-item"
                            style={{
                              position: "relative",
                              border: "1px solid #ddd",
                              padding: "5px",
                              borderRadius: "4px",
                            }}
                          >
                            <img
                              src={`http://localhost:3000/${imgUrl}`}
                              alt={`Existing Image ${i}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "2px",
                              }}
                            />
                            <button
                              onClick={() => removeEditImage(i)}
                              style={{
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                lineHeight: "1",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="editProductImages"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Upload New Images:
                    </label>
                    <input
                      id="editProductImages"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="admin-input"
                      style={{ padding: "8px" }}
                    />
                  </div>

                  <div
                    className="preview-gallery"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {editImageFiles.map((img, i) => (
                      <div
                        key={`new-${i}`}
                        className="preview-item"
                        style={{
                          position: "relative",
                          border: "1px solid #ddd",
                          padding: "5px",
                          borderRadius: "4px",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`New Preview ${i}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "2px",
                          }}
                        />
                        <button
                          onClick={() => removeEditImage(i, true)}
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            background: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            lineHeight: "1",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleEditSubmit}
                    className="btnn"
                    style={{ backgroundColor: "#007bff", width: "100%" }}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </Dialog>
          </div>
        ) : (
          renderMainContent()
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;