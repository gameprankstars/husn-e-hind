import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Package, ShoppingBag, TrendingUp, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'stats'>('stats');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, statsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1174071d/products`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/orders`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/stats`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }),
      ]);

      const [productsData, ordersData, statsData] = await Promise.all([
        productsRes.json(),
        ordersRes.json(),
        statsRes.json(),
      ]);

      if (productsData.success) setProducts(productsData.products);
      if (ordersData.success) setOrders(ordersData.orders);
      if (statsData.success) setStats(statsData.stats);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-50 overflow-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-amber-900 to-amber-800 text-white sticky top-0 z-10 shadow-2xl"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif mb-1">Admin Panel</h1>
              <p className="text-amber-200">Manage your jewellery store</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-[88px] z-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-4 flex items-center gap-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-amber-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400">Loading...</p>
              </div>
            </motion.div>
          ) : (
            <>
              {activeTab === 'stats' && <StatsView stats={stats} />}
              {activeTab === 'products' && (
                <ProductsView
                  products={products}
                  onRefresh={fetchData}
                  showForm={showProductForm}
                  setShowForm={setShowProductForm}
                  editingProduct={editingProduct}
                  setEditingProduct={setEditingProduct}
                />
              )}
              {activeTab === 'orders' && <OrdersView orders={orders} onRefresh={fetchData} />}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Stats View Component
function StatsView({ stats }: { stats: any }) {
  const statCards = [
    { label: 'Total Products', value: stats.totalProducts || 0, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Orders', value: stats.totalOrders || 0, icon: ShoppingBag, color: 'from-green-500 to-green-600' },
    { label: 'Pending Orders', value: stats.pendingOrders || 0, icon: TrendingUp, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Completed Orders', value: stats.completedOrders || 0, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <motion.div
      key="stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gradient-to-br ${stat.color} p-6 text-white shadow-xl relative overflow-hidden`}
          >
            <div className="relative z-10">
              <stat.icon className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-white/80">{stat.label}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <stat.icon className="w-32 h-32" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 p-8 shadow-xl text-center"
      >
        <h3 className="text-2xl font-serif text-white mb-4">Welcome to Admin Panel</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Manage your products, track orders, and monitor your store's performance all in one place.
        </p>
      </motion.div>
    </motion.div>
  );
}

// Products View Component
function ProductsView({
  products,
  onRefresh,
  showForm,
  setShowForm,
  editingProduct,
  setEditingProduct,
}: any) {
  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/products/${id}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );
      onRefresh();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleVisibility = async (product: any) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/products/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ visible: !product.visible }),
        }
      );
      onRefresh();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <motion.div
      key="products"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-white">Products Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus size={20} />
          Add Product
        </motion.button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingProduct(null);
            onRefresh();
          }}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any, index: number) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800 overflow-hidden shadow-xl"
          >
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleVisibility(product)}
                  className={`w-8 h-8 ${
                    product.visible !== false ? 'bg-green-500' : 'bg-gray-600'
                  } text-white rounded-full flex items-center justify-center shadow-lg`}
                  title={product.visible !== false ? 'Visible' : 'Hidden'}
                >
                  {product.visible !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                </motion.button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-serif text-white mb-2">{product.name}</h3>
              <p className="text-amber-400 mb-4">₹{product.price?.toLocaleString('en-IN')}</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Pencil size={16} />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Product Form Component
function ProductForm({ product, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || '',
    description: product?.description || '',
    visible: product?.visible !== false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = product
        ? `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/products/${product.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/products`;

      await fetch(url, {
        method: product ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gray-800 p-6 mb-6 shadow-xl"
    >
      <h3 className="text-xl font-serif text-white mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Price (₹)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="visible"
            checked={formData.visible}
            onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="visible" className="text-gray-300">Visible on website</label>
        </div>
        <div className="flex gap-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </motion.button>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

// Orders View Component
function OrdersView({ orders, onRefresh }: any) {
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/orders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      onRefresh();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/admin/orders/${orderId}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );
      onRefresh();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-serif text-white mb-6">Orders Management</h2>

      <div className="space-y-4">
        {orders.map((order: any, index: number) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5 }}
            className="bg-gray-800 p-6 shadow-xl"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-serif text-white mb-2">{order.productName}</h3>
                <div className="grid md:grid-cols-2 gap-2 text-gray-400 text-sm">
                  <p><strong>Customer:</strong> {order.name}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Price:</strong> ₹{order.productPrice?.toLocaleString('en-IN')}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  <strong>Address:</strong> {order.address}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className={`px-4 py-2 rounded ${
                    order.status === 'completed'
                      ? 'bg-green-600'
                      : order.status === 'pending'
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                  } text-white`}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteOrder(order.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No orders yet
          </div>
        )}
      </div>
    </motion.div>
  );
}