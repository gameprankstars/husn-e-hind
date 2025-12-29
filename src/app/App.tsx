import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminButton } from './components/AdminButton';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/products`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        // Filter only visible products for customer view
        setProducts(data.products.filter((p: any) => p.visible !== false));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize demo data on first load
  const initializeData = async () => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1174071d/seed`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
    } catch (error) {
      // Silently fail if already seeded
    }
  };

  useEffect(() => {
    initializeData().then(() => {
      fetchProducts();
    });
  }, []);

  if (showAdmin) {
    return <AdminPanel onClose={() => {
      setShowAdmin(false);
      fetchProducts();
    }} />;
  }

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      {/* Smooth Scroll Container */}
      <div className="overflow-x-hidden">
        <Hero />
        <About />
        <Products products={products} loading={loading} />
        <Footer />
        <AdminButton onClick={() => setShowAdmin(true)} />
      </div>
    </div>
  );
}
