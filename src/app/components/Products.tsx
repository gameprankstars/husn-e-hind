import { motion } from 'motion/react';
import { useState } from 'react';
import { OrderModal } from './OrderModal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsProps {
  products: Product[];
  loading: boolean;
}

export function Products({ products, loading }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) {
    return (
      <section id="products" className="py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-white h-96 shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-32 bg-[#FAF9F6] overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"
            />
            
            <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <span className="bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
                Exquisite Collection
              </span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Each piece in our collection is a testament to the artistry and dedication 
              of our master craftsmen
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ y: -15 }}
                className="group relative bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gold Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none"
                />

                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="h-full"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Price</span>
                      <p className="text-2xl font-serif text-amber-700">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProduct(product)}
                      className="relative px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 tracking-wider uppercase text-sm">
                        Order Now
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Corner Decoration */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1, rotate: 90 }}
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400"
                />
              </motion.div>
            ))}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">
                No products available at the moment. Please check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
