import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1174071d/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== PRODUCTS ROUTES ====================

// Get all products
app.get("/make-server-1174071d/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ success: true, products });
  } catch (error) {
    console.log("Error fetching products:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single product
app.get("/make-server-1174071d/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const product = await kv.get(`product:${id}`);
    if (!product) {
      return c.json({ success: false, error: "Product not found" }, 404);
    }
    return c.json({ success: true, product });
  } catch (error) {
    console.log("Error fetching product:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create product (admin only)
app.post("/make-server-1174071d/admin/products", async (c) => {
  try {
    const body = await c.req.json();
    const { name, price, image, description, visible = true } = body;
    
    if (!name || !price || !image) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }
    
    const id = crypto.randomUUID();
    const product = {
      id,
      name,
      price,
      image,
      description: description || "",
      visible,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, product);
    return c.json({ success: true, product });
  } catch (error) {
    console.log("Error creating product:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update product (admin only)
app.put("/make-server-1174071d/admin/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ success: false, error: "Product not found" }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, updatedProduct);
    return c.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log("Error updating product:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete product (admin only)
app.delete("/make-server-1174071d/admin/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`product:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting product:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ORDERS ROUTES ====================

// Create order
app.post("/make-server-1174071d/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, address, productId, productName, productPrice } = body;
    
    if (!name || !phone || !address || !productId) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }
    
    const id = crypto.randomUUID();
    const order = {
      id,
      name,
      phone,
      address,
      productId,
      productName,
      productPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${id}`, order);
    return c.json({ success: true, order });
  } catch (error) {
    console.log("Error creating order:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all orders (admin only)
app.get("/make-server-1174071d/admin/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    // Sort by date descending
    const sortedOrders = orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ success: true, orders: sortedOrders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update order status (admin only)
app.put("/make-server-1174071d/admin/orders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;
    
    const existingOrder = await kv.get(`order:${id}`);
    if (!existingOrder) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }
    
    const updatedOrder = {
      ...existingOrder,
      status,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${id}`, updatedOrder);
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log("Error updating order:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete order (admin only)
app.delete("/make-server-1174071d/admin/orders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`order:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting order:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ADMIN STATS ====================

// Get dashboard stats
app.get("/make-server-1174071d/admin/stats", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    const orders = await kv.getByPrefix("order:");
    
    const stats = {
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o: any) => o.status === "pending").length,
      completedOrders: orders.filter((o: any) => o.status === "completed").length,
    };
    
    return c.json({ success: true, stats });
  } catch (error) {
    console.log("Error fetching stats:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== SEED DATA ====================

// Seed initial data (for demo purposes)
app.post("/make-server-1174071d/seed", async (c) => {
  try {
    // Check if products already exist
    const existingProducts = await kv.getByPrefix("product:");
    if (existingProducts.length > 0) {
      return c.json({ success: false, error: "Data already seeded" }, 400);
    }
    
    const sampleProducts = [
      {
        id: crypto.randomUUID(),
        name: "Maharani Kundan Necklace",
        price: 45000,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
        description: "Exquisite handcrafted Kundan necklace with intricate gold work",
        visible: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Pearl Jadau Earrings",
        price: 28000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
        description: "Traditional Jadau earrings adorned with lustrous pearls",
        visible: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Polki Diamond Maang Tikka",
        price: 52000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
        description: "Regal Polki diamond maang tikka with gold detailing",
        visible: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Meenakari Bangles Set",
        price: 32000,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
        description: "Colorful Meenakari work on 22k gold bangles",
        visible: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Temple Jewellery Choker",
        price: 38000,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800",
        description: "South Indian temple jewellery choker with antique finish",
        visible: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Ruby Jhumka Earrings",
        price: 24000,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800",
        description: "Classic jhumka earrings with precious rubies",
        visible: true,
        createdAt: new Date().toISOString(),
      },
    ];
    
    for (const product of sampleProducts) {
      await kv.set(`product:${product.id}`, product);
    }
    
    return c.json({ success: true, message: "Data seeded successfully", count: sampleProducts.length });
  } catch (error) {
    console.log("Error seeding data:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
