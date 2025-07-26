import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Admin.scss";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductsInCategory, setTotalProductsInCategory] = useState(0);
  const productsPerPage = 10;

  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    existingImages: [],
    imagesToDelete: [],
  });
  const [formSubmitError, setFormSubmitError] = useState(null);

  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);
  const [productDetailError, setProductDetailError] = useState(null);
  
  const [showCategoryFormModal, setShowCategoryFormModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: '',
    description: '',
    newImage: null,
    image: null,
  });

  const apiBaseUrl = 'http://localhost:3000';
  const token = localStorage.getItem('accessToken');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCategoriesData = useCallback(async () => {
    try {
      setLoadingCategories(true);
      setCategoriesError(null);
      const response = await axios.get(`${apiBaseUrl}/category`);
      setCategories(response.data);
      setTotalCategories(response.data.length);
    } catch (err) {
      setCategoriesError("Failed to fetch categories. Please try again.");
      console.error("Error fetching categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  const fetchAllProductsForSummary = useCallback(async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const response = await axios.get(`${apiBaseUrl}/product?limit=1`);
      const [_, totalCount] = response.data;
      setTotalProducts(totalCount);
    } catch (err) {
      setSummaryError("Failed to fetch product summary. Please try again.");
      console.error("Error fetching all products for summary:", err);
    } finally {
      setSummaryLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchAllProductsForSummary();
  }, [fetchAllProductsForSummary]);

  const fetchProductsByCategory = useCallback(
    async (pageToFetch = 1) => {
      if (selectedCategory) {
        setLoadingProducts(true);
        setProductsError(null);
        try {
          const response = await axios.get(
            `${apiBaseUrl}/product?categoryId=${selectedCategory.id}&page=${pageToFetch}`
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
    [selectedCategory, apiBaseUrl]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchProductsByCategory(1);
  }, [selectedCategory, fetchProductsByCategory]);

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
  
  const removeExistingImage = (imageUrl) => {
    const updatedExistingImages = formData.existingImages.filter(
      (url) => url !== imageUrl
    );
    const updatedImagesToDelete = [...formData.imagesToDelete, imageUrl];
    setFormData({
      ...formData,
      existingImages: updatedExistingImages,
      imagesToDelete: updatedImagesToDelete,
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      images: [],
      existingImages: product.images || [],
      imagesToDelete: [],
    });
    setShowProductFormModal(true);
  };

  const handleProductSubmit = async () => {
    if (!selectedCategory) {
      alert("Please select a category before adding/editing a product.");
      return;
    }
    if (
      formData.name ||
      formData.description ||
      formData.price ||
      (formData.images.length === 0 && formData.existingImages.length === 0)
    ) {
      alert(
        "Please upload at least one image."
      );
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
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
    
    if (editingProduct && formData.existingImages.length > 0) {
        productPayload.append("existingImages", JSON.stringify(formData.existingImages));
    }

    if (editingProduct && formData.imagesToDelete.length > 0) {
      productPayload.append("imagesToDelete", JSON.stringify(formData.imagesToDelete));
    }

    try {
      if (editingProduct) {
        await axios.patch(`${apiBaseUrl}/product/${editingProduct}`, productPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product updated successfully!");
      } else {
        await axios.post(`${apiBaseUrl}/product`, productPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product added successfully!");
      }

      setFormData({ name: "", description: "", price: "", images: [], existingImages: [], imagesToDelete: [] });
      setShowProductFormModal(false);
      setEditingProduct(null);
      fetchProductsByCategory(1);
      fetchAllProductsForSummary();
    } catch (error) {
      console.error(
        "Error submitting product:",
        error.response?.data || error.message
      );
      setFormSubmitError(
        error.response?.data?.message ||
        "Failed to save product. Please try again."
      );
    }
  };

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
      await axios.delete(`${apiBaseUrl}/product/${productId}`, authHeader);
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

  const handleProductCardClick = async (productId) => {
    setLoadingProductDetail(true);
    setProductDetailError(null);
    setSelectedProductDetail(null);
    setShowProductDetailModal(true);

    try {
      const response = await axios.get(
        `${apiBaseUrl}/product/${productId}`
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setAuthenticated(false);
    navigate("/login");
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCategory(null);
    setShowProductFormModal(false);
    setFormSubmitError(null);
    setCurrentPage(1);
    setTotalProductsInCategory(0);
    setSelectedProductDetail(null);
    setShowProductDetailModal(false);
    setLoadingProductDetail(false);
    setProductDetailError(null);
  };

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

  const openNewCategory = () => {
    setEditingCategory(false);
    setCategoryFormData({ id: null, name: '', description: '', newImage: null, image: null });
    setShowCategoryFormModal(true);
  };

  const editCategory = (cat) => {
    setEditingCategory(true);
    setCategoryFormData({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      newImage: null,
      image: cat.image,
    });
    setShowCategoryFormModal(true);
  };

  const confirmDeleteCategory = (cat) => {
    setCategoryFormData(cat);
    setDeleteCategoryDialog(true);
  };

  const deleteCategory = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/category/${categoryFormData.id}`, authHeader);
      alert('Category Deleted Successfully!');
      setDeleteCategoryDialog(false);
      setCategoryFormData({ id: null, name: '', description: '', newImage: null, image: null });
      await fetchCategoriesData();
    } catch (err) {
      const errorDetail = err.response?.data?.message || 'An error occurred.';
      alert(errorDetail);
    }
  };

  const onCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const onCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryFormData(prev => ({ ...prev, newImage: file }));
  };

  const saveCategory = async () => {
    if (!categoryFormData.name.trim()) {
      alert('Category name is required.');
      return;
    }

    console.log("Saving category...");
    console.log("Current categoryFormData:", categoryFormData);

    const formDataToSend = new FormData();
    formDataToSend.append('name', categoryFormData.name);
    if (categoryFormData.description) {
      formDataToSend.append('description', categoryFormData.description);
    }
    if (categoryFormData.newImage) {
        console.log("New image detected. Appending to FormData.");
        formDataToSend.append('image', categoryFormData.newImage);
    } else {
      console.log("No new image to upload.");
    }

    console.log("--- FormData before API call ---");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("----------------------------------");

    try {
      if (editingCategory) {
        console.log(`Sending PATCH request to update category ID: ${categoryFormData.id}`);
        const response = await axios.patch(`${apiBaseUrl}/category/${categoryFormData.id}`, formDataToSend, authHeader);
        console.log("PATCH request successful. Response:", response.data);
        alert('Category Updated Successfully!');
      } else {
        console.log(`Sending POST request to create new category.`);
        const response = await axios.post(`${apiBaseUrl}/category`, formDataToSend, authHeader);
        console.log("POST request successful. Response:", response.data);
        alert('Category Created Successfully!');
      }
      await fetchCategoriesData();
      setShowCategoryFormModal(false);
    } catch (err) {
      console.error("API call failed.", err);
      const errorDetail = err.response?.data?.message || 'An error occurred.';
      alert(errorDetail);
    }
  };
  
  const categoryImageTemplate = (rowData) => {
    const imageUrl = rowData.image ? `${apiBaseUrl}/${rowData.image}` : null;
    return imageUrl ? <img src={imageUrl} alt={rowData.name} style={{ width: '64px', objectFit: 'cover' }} /> : null;
};

  const categoryActionTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded text className="mr-2" onClick={() => editCategory(rowData)} />
        <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDeleteCategory(rowData)} />
      </>
    );
  };
  
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
      case "manageCategories":
        return (
          <div className="category-management-container">
            <h1 className="mb-4">Manage Categories</h1>
            <Button
              label="Add New Category"
              icon="pi pi-plus"
              className="mb-4"
              onClick={openNewCategory}
            />
            <DataTable
              value={categories}
              paginator
              rows={10}
              dataKey="id"
              loading={loadingCategories}
              emptyMessage="No categories found."
            >
              <Column field="id" header="ID" sortable />
              <Column field="name" header="Name" sortable />
              <Column field="description" header="Description" />
              <Column header="Image" body={categoryImageTemplate} />
              <Column body={categoryActionTemplate} headerStyle={{ width: '10rem' }} />
            </DataTable>
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
                        ? `${apiBaseUrl}/${cat.image}`
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

  const categoryDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={() => setShowCategoryFormModal(false)} />
      <Button label="Save" icon="pi pi-check" onClick={saveCategory} />
    </>
  );

  const deleteCategoryDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" outlined onClick={() => setDeleteCategoryDialog(false)} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCategory} />
    </>
  );

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
            className={activeTab === "manageCategories" ? "active" : ""}
            onClick={() => handleTabChange("manageCategories")}
          >
            Manage Categories
          </button>
          <button
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => handleTabChange("categories")}
          >
            Products by Category
          </button>
          {/* <button
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
          </button> */}
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
                setEditingProduct(null);
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
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                    name: "", description: "", price: "", images: [],
                    existingImages: [], imagesToDelete: []
                });
                setShowProductFormModal(true);
              }}
            >
              + Add Product
            </button>

            <Dialog
              header={editingProduct ? "Edit Product" : `Add Product to ${selectedCategory.name}`}
              visible={showProductFormModal}
              style={{ width: "50vw", maxWidth: "600px" }}
              onHide={() => {
                setShowProductFormModal(false);
                setFormData({
                  name: "", description: "", price: "", images: [],
                  existingImages: [], imagesToDelete: []
                });
                setEditingProduct(null);
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

                {formData.existingImages.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      Current Images:
                    </p>
                    <div className="preview-gallery" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {formData.existingImages.map((imgUrl, i) => (
                        <div key={`existing-${i}`} className="preview-item" style={{ position: "relative" }}>
                          <img
                            src={`${apiBaseUrl}/${imgUrl}`}
                            alt={`Existing Preview ${i}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "2px" }}
                          />
                          <button
                            onClick={() => removeExistingImage(imgUrl)}
                            style={{
                              position: "absolute", top: "0", right: "0",
                              background: "#e74c3c", color: "white", border: "none",
                              borderRadius: "50%", width: "20px", height: "20px",
                              lineHeight: "1", cursor: "pointer", fontSize: "12px", fontWeight: "bold",
                            }}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="productImages"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Upload New Images:
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

                {formData.images.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      New Images to Upload:
                    </p>
                    <div
                        className="preview-gallery"
                        style={{
                            display: "flex", flexWrap: "wrap", gap: "10px",
                        }}
                    >
                        {formData.images.map((img, i) => (
                        <div
                            key={`new-${i}`}
                            className="preview-item"
                            style={{ position: "relative" }}
                        >
                            <img
                            src={URL.createObjectURL(img)}
                            alt={`New Preview ${i}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "2px" }}
                            />
                            <button
                            onClick={() => removeImage(i)}
                            style={{
                                position: "absolute", top: "0", right: "0",
                                background: "#e74c3c", color: "white", border: "none",
                                borderRadius: "50%", width: "20px", height: "20px",
                                lineHeight: "1", cursor: "pointer", fontSize: "12px", fontWeight: "bold",
                            }}
                            >
                            X
                            </button>
                        </div>
                        ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={handleProductSubmit}
                  className="btnn"
                  style={{ backgroundColor: editingProduct ? "#17a2b8" : "#28a745", width: "100%" }}
                >
                  {editingProduct ? "Save Changes" : "Submit Product"}
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
                          ? `${apiBaseUrl}/${product.images[0]}`
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
                        <p className="category-link">
                          Category: {product.category.name}
                        </p>
                      )}
                      <div className="actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(product);
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
                            src={`${apiBaseUrl}/${imgUrl}`}
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
          </div>
        ) : (
          renderMainContent()
        )}
      </main>

      <Dialog
        visible={showCategoryFormModal}
        style={{ width: '450px' }}
        header={editingCategory ? "Edit Category" : "Add New Category"}
        modal
        className="p-fluid"
        footer={categoryDialogFooter}
        onHide={() => setShowCategoryFormModal(false)}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">Name</label>
          <InputText
            id="name"
            name="name"
            value={categoryFormData.name}
            onChange={onCategoryFormChange}
            required
            autoFocus
          />
        </div>
        <div className="field mt-3">
          <label htmlFor="description" className="font-bold">Description</label>
          <InputText
            id="description"
            name="description"
            value={categoryFormData.description}
            onChange={onCategoryFormChange}
          />
        </div>
        <div className="field mt-3">
          <label htmlFor="image" className="font-bold">Image</label>
          <input type="file" id="image" onChange={onCategoryImageChange} />
        </div>

        <div className="mt-3 image-preview-container">
          {categoryFormData.newImage ? (
            <img src={URL.createObjectURL(categoryFormData.newImage)} alt="Preview" className="w-6rem shadow-2 border-round" />
          ) : categoryFormData.image ? (
            <img src={`${apiBaseUrl}/${categoryFormData.image}`} alt="Current" className="w-6rem shadow-2 border-round" />
          ) : null}
        </div>
      </Dialog>

      <Dialog
        visible={deleteCategoryDialog}
        style={{ width: '450px' }}
        header="Confirm Deletion"
        modal
        footer={deleteCategoryDialogFooter}
        onHide={() => setDeleteCategoryDialog(false)}
      >
        <div className="flex align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {categoryFormData && <span>Are you sure you want to delete category <b>{categoryFormData.name}</b>?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;