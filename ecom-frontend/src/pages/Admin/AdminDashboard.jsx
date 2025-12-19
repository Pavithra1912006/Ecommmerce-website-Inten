import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { productAPI, adminAPI, reviewAPI } from "../../services/api";
import {
  Container,
  Title,
  TabContainer,
  Tab,
  Content,
  AddProductForm,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  Button,
  Table,
  Th,
  Td,
  ActionButton,
  StatusBadge,
} from "./Admin.styles";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "",
    type: "",
    quantity: "",
    minQuantity: "",
    discount: "",
    image: "",
    description: "",
    brand: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (activeTab === "dashboard") fetchStats();
    if (activeTab === "products") fetchProducts();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "lowstock") fetchLowStock();
    if (activeTab === "feedback") fetchReviews();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll({ admin: true });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      // Filter out admin users
      setUsers(response.data.filter((user) => !user.isAdmin));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchLowStock = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getLowStock();
      setLowStockProducts(response.data);
    } catch (error) {
      console.error("Error fetching low stock products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const allReviews = [];
      for (const product of products.length > 0 ? products : await productAPI.getAll({ admin: true }).then(res => res.data.products || res.data)) {
        try {
          const response = await reviewAPI.getProductReviews(product._id);
          allReviews.push(...response.data.map(review => ({ ...review, productName: product.name })));
        } catch (error) {
          console.error(`Error fetching reviews for product ${product._id}:`, error);
        }
      }
      setReviews(allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productAPI.create({
        ...productForm,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
        minQuantity: Number(productForm.minQuantity) || 0,
        discount: Number(productForm.discount),
        rating: 0,
        numReviews: 0,
        isActive: true,
      });

      setProductForm({
        name: "",
        price: "",
        category: "",
        type: "",
        quantity: "",
        minQuantity: "",
        discount: "",
        image: "",
        description: "",
        brand: "",
      });

      fetchProducts();
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product._id);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      type: product.type,
      quantity: product.quantity.toString(),
      minQuantity: product.minQuantity?.toString() || "",
      discount: product.discount.toString(),
      image: product.image,
      description: product.description,
      brand: product.brand,
    });
  };

  const handleRestockProduct = (product) => {
    handleEditProduct(product);
    setActiveTab("products");
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productAPI.update(editingProduct, {
        ...productForm,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
        minQuantity: Number(productForm.minQuantity) || 0,
        discount: Number(productForm.discount),
      });

      setProductForm({
        name: "",
        price: "",
        category: "",
        type: "",
        quantity: "",
        minQuantity: "",
        discount: "",
        image: "",
        description: "",
        brand: "",
      });

      setEditingProduct(null);
      fetchProducts();
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(id);
        fetchProducts();
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      fetchOrders();
      toast.success("Order status updated!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      await adminAPI.blockUser(userId, isBlocked);
      fetchUsers();
      toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully!`);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to update user status");
    }
  };

  const renderProducts = () => (
    <>
      <AddProductForm
        onSubmit={editingProduct ? handleUpdateProduct : handleProductSubmit}
      >
        <FormGroup>
          <Label>Product Name</Label>
          <Input
            type="text"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Brand</Label>
          <Input
            type="text"
            value={productForm.brand}
            onChange={(e) =>
              setProductForm({ ...productForm, brand: e.target.value })
            }
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Select
            value={productForm.category}
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            <option value="skincare">Skincare</option>
            <option value="makeup">Makeup</option>
            <option value="haircare">Haircare</option>
            <option value="bodycare">Bodycare</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Type</Label>
          <Select
            value={productForm.type}
            onChange={(e) =>
              setProductForm({ ...productForm, type: e.target.value })
            }
            required
          >
            <option value="">Select Type</option>
            {productForm.category === "skincare" && (
              <>
                <option value="cleanser">Cleanser</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="serum">Serum</option>
                <option value="sunscreen">Sunscreen</option>
              </>
            )}
            {productForm.category === "makeup" && (
              <>
                <option value="foundation">Foundation</option>
                <option value="lipstick">Lipstick</option>
                <option value="eyeshadow">Eyeshadow</option>
                <option value="mascara">Mascara</option>
              </>
            )}
            {productForm.category === "haircare" && (
              <>
                <option value="shampoo">Shampoo</option>
                <option value="conditioner">Conditioner</option>
                <option value="hair-oil">Hair Oil</option>
                <option value="styling">Styling</option>
              </>
            )}
            {productForm.category === "bodycare" && (
              <>
                <option value="body-lotion">Body Lotion</option>
                <option value="body-wash">Body Wash</option>
                <option value="scrub">Scrub</option>
                <option value="perfume">Perfume</option>
              </>
            )}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={productForm.quantity}
            onChange={(e) =>
              setProductForm({ ...productForm, quantity: e.target.value })
            }
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Min Quantity</Label>
          <Input
            type="number"
            value={productForm.minQuantity}
            onChange={(e) =>
              setProductForm({ ...productForm, minQuantity: e.target.value })
            }
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>Discount (%)</Label>
          <Input
            type="number"
            value={productForm.discount}
            onChange={(e) =>
              setProductForm({ ...productForm, discount: e.target.value })
            }
            min="0"
            max="100"
          />
        </FormGroup>

        <FormGroup>
          <Label>Image URL</Label>
          <Input
            type="url"
            value={productForm.image}
            onChange={(e) =>
              setProductForm({ ...productForm, image: e.target.value })
            }
            required
          />
        </FormGroup>

        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label>Description</Label>
          <TextArea
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            required
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={loading}
          style={{ gridColumn: "1 / -1" }}
        >
          {loading
            ? editingProduct
              ? "Updating..."
              : "Adding..."
            : editingProduct
            ? "Update Product"
            : "Add Product"}
        </Button>
        {editingProduct && (
          <Button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setProductForm({
                name: "",
                price: "",
                category: "",
                type: "",
                quantity: "",
                minQuantity: "",
                discount: "",
                image: "",
                description: "",
                brand: "",
              });
            }}
            style={{ gridColumn: "1 / -1", background: "#666" }}
          >
            Cancel Edit
          </Button>
        )}
      </AddProductForm>

      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading products...
        </div>
      )}
      {!loading && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          No products found
        </div>
      )}
      {!loading && products.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Min Qty</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                style={{
                  backgroundColor:
                    product.quantity <= product.minQuantity &&
                    product.minQuantity > 0
                      ? "#ffebee"
                      : "transparent",
                }}
              >
                <Td>{product.name}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.category}</Td>
                <Td>₹{product.price}</Td>
                <Td
                  style={{
                    color:
                      product.quantity <= product.minQuantity &&
                      product.minQuantity > 0
                        ? "#d32f2f"
                        : "inherit",
                  }}
                >
                  {product.quantity}
                </Td>
                <Td>{product.minQuantity || 0}</Td>
                <Td>
                  <ActionButton onClick={() => handleEditProduct(product)}>
                    Edit
                  </ActionButton>
                  <ActionButton
                    danger
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  const renderDashboard = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
      }}
    >
      <div
        style={{
          background: "#e3f2fd",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "2rem", color: "#1976d2", margin: "0" }}>
          {stats?.totalUsers || 0}
        </h3>
        <p style={{ color: "#666", margin: "0.5rem 0 0" }}>Total Users</p>
      </div>
      <div
        style={{
          background: "#f3e5f5",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "2rem", color: "#7b1fa2", margin: "0" }}>
          {stats?.totalOrders || 0}
        </h3>
        <p style={{ color: "#666", margin: "0.5rem 0 0" }}>Total Orders</p>
      </div>
      <div
        style={{
          background: "#e8f5e9",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "2rem", color: "#388e3c", margin: "0" }}>
          {stats?.totalDeliveredOrders || 0}
        </h3>
        <p style={{ color: "#666", margin: "0.5rem 0 0" }}>Delivered Orders</p>
      </div>
      <div
        style={{
          background: "#fff3e0",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "2rem", color: "#f57c00", margin: "0" }}>
          {stats?.totalProducts || 0}
        </h3>
        <p style={{ color: "#666", margin: "0.5rem 0 0" }}>Total Products</p>
      </div>
      <div
        style={{
          background: "#ffebee",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: "2rem", color: "#d32f2f", margin: "0" }}>
          {stats?.lowStockProducts || 0}
        </h3>
        <p style={{ color: "#666", margin: "0.5rem 0 0" }}>Low Stock</p>
      </div>
    </div>
  );

  const renderUsers = () => (
    <Table>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Admin</Th>
          <Th>Status</Th>
          <Th>Joined</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.isAdmin ? "Yes" : "No"}</Td>
            <Td>
              <StatusBadge status={user.isBlocked ? "pending" : "delivered"}>
                {user.isBlocked ? "Blocked" : "Active"}
              </StatusBadge>
            </Td>
            <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
            <Td>
              {!user.isAdmin && (
                <ActionButton
                  danger={!user.isBlocked}
                  onClick={() => handleBlockUser(user._id, !user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </ActionButton>
              )}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderOrders = () => (
    <Table>
      <thead>
        <tr>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Total</Th>
          <Th>Status</Th>
          <Th>Date</Th>
          <Th>Time</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <Td>{order._id.slice(-8)}</Td>
            <Td>{order.user?.name}</Td>
            <Td>₹{Math.round(order.total)}</Td>
            <Td>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </Td>
            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
            <Td>{new Date(order.createdAt).toLocaleTimeString()}</Td>
            <Td>
              <Select
                value={order.status}
                onChange={(e) =>
                  handleUpdateOrderStatus(order._id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </Select>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderLowStock = () => (
    <>
      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading low stock products...
        </div>
      )}
      {!loading && lowStockProducts.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          No low stock products found
        </div>
      )}
      {!loading && lowStockProducts.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Category</Th>
              <Th>Current Stock</Th>
              <Th>Min Required</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product._id} style={{ backgroundColor: "#ffebee" }}>
                <Td>{product.name}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.category}</Td>
                <Td style={{ color: "#d32f2f", fontWeight: "bold" }}>
                  {product.quantity}
                </Td>
                <Td>{product.minQuantity}</Td>
                <Td>
                  <ActionButton onClick={() => handleRestockProduct(product)}>
                    Restock
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  const renderFeedback = () => (
    <>
      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading customer feedback...
        </div>
      )}
      {!loading && reviews.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          No customer reviews found
        </div>
      )}
      {!loading && reviews.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Customer</Th>
              <Th>Rating</Th>
              <Th>Review</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <Td>{review.productName}</Td>
                <Td>{review.user.name}</Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < review.rating ? '#ffa500' : '#ddd' }}>★</span>
                    ))}
                    <span style={{ marginLeft: '0.5rem' }}>({review.rating})</span>
                  </div>
                </Td>
                <Td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{review.comment}</Td>
                <Td>{new Date(review.createdAt).toLocaleDateString()}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  return (
    <Container>
      <Title>Admin Dashboard</Title>

      <TabContainer>
        <Tab
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </Tab>
        <Tab
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          Products
        </Tab>
        <Tab
          active={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </Tab>
        <Tab
          active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </Tab>
        <Tab
          active={activeTab === "lowstock"}
          onClick={() => setActiveTab("lowstock")}
        >
          Low Stock
        </Tab>
        <Tab
          active={activeTab === "feedback"}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </Tab>
      </TabContainer>

      <Content>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "lowstock" && renderLowStock()}
        {activeTab === "feedback" && renderFeedback()}
      </Content>
    </Container>
  );
};

export default AdminDashboard;
