// // // <CHANGE> Updated all types to match actual backend API structure
// // export interface User {
// //   id: number
// //   name: string
// //   phone: string
// //   email?: string
// //   role: "user" | "admin"
// //   membershipLevel: "bronze" | "silver" | "gold" | "platinum"
// //   points: number
// //   totalOrders: number
// //   isVerified: boolean
// //   address?: {
// //     street: string
// //     city: string
// //     district: string
// //     postalCode: string
// //   }
// //   created_at?: string
// // }

// // export interface Product {
// //   id: number
// //   name: string
// //   name_ar: string
// //   brand: string
// //   price: string | number
// //   original_price: string | number
// //   sale_price?: string | number
// //   description: string
// //   description_ar: string
// //   category_id: number
// //   image_url: string
// //   emoji_icon: string
// //   rating: string | number
// //   reviews_count: number
// //   in_stock: boolean
// //   discount: number
// //   badge: string
// //   stock_quantity: number
// //   created_at: string
// //   updated_at: string
// //   category_name?: string
// //   category_name_ar?: string
// // }

// // export interface Category {
// //   id: number
// //   name: string
// //   name_ar: string
// //   icon: string
// //   color: string
// //   image_url: string
// //   product_count: string | number
// //   created_at: string
// // }

// // export interface Order {
// //   id: number
// //   order_number: string
// //   user_id: number
  
// //   user_email: string // أضف هذا
// //   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
// //   total_amount: string 
// //   shipping_cost: string | number
// //   discount_amount: string | number
// //   delivery_address: string
// //   delivery_phone: string
// //   delivery_name: string
// //   notes?: string
// //   created_at: string
// //   updated_at: string
// //   items: OrderItem[]
// // }

// // export interface OrderItem {
// //   id: number
// //   order_id: number
// //   product_id: number
// //   quantity: number
// //   price: string | number
// //   name: string
// //   image_url: string
// //   emoji_icon: string
// //   created_at: string
// // }

// // // export interface Ad {
// // //   id: number
// // //   title: string
// // //   description?: string
// // //   image_url: string
// // //   link_url?: string
// // //   position: "homepage" | "sidebar" | "banner"
// // //   is_active: boolean
// // //   view_count: number
// // //   click_count: number
// // //   created_at: string
// // // }

// // export interface Ad {
// //   id: number;
// //   title: string;
// //   title_ar: string;
// //   description: string;
// //   description_ar: string;
// //   image_url: string;
// //   start_date: string;
// //   end_date: string;
// //   position: "home_banner" | "category_banner" | "product_banner" | "sidebar";
// //   priority: number;
// //   product_id?: number;
// //   product_name?: string;
// //   product_name_ar?: string;
// //   product_price?: string;
// //   is_active?: boolean;
// //   view_count?: number;
// //   click_count?: number;
// // }

// // export interface CartItem {
// //   product_id: number
// //   quantity: number
// //   product?: Product
// // }

// // export interface DashboardStats {
// //   totalRevenue: number
// //   totalOrders: number
// //   totalProducts: number
// //   totalUsers: number
// //   revenueChange: number
// //   ordersChange: number
// //   productsChange: number
// //   usersChange: number
// // }

// // export interface ProductsResponse {
// //   products: Product[]
// //   pagination: {
// //     total: number
// //     page: number
// //     limit: number
// //     totalPages: number
// //   }
// // }





// // Updated all types to match actual backend API structure
// export interface User {
//   id: number
//   name: string
//   phone: string
//   email?: string
//   role: "user" | "admin"
//   membershipLevel: "bronze" | "silver" | "gold" | "platinum"
//   points: number
//   totalOrders: number
//   isVerified: boolean
//   address?: {
//     street: string
//     city: string
//     district: string
//     postalCode: string
//   }
//   created_at?: string
// }

// export interface Product {
//   id: number
//   name: string
//   name_ar: string
//   brand: string
//   price: string | number
//   original_price: string | number
//   sale_price?: string | number
//   description: string
//   description_ar: string
//   category_id: number
//   image_url: string
//   emoji_icon: string
//   rating: string | number
//   reviews_count: number
//   in_stock: boolean
//   discount: number
//   badge: string
//   stock_quantity: number
//   created_at: string
//   updated_at: string
//   category_name?: string
//   category_name_ar?: string
// }

// export interface Category {
//   id: number
//   name: string
//   name_ar: string
//   icon: string
//   color: string
//   image_url: string
//   product_count: string | number
//   created_at: string
// }

// export interface Order {
//   id: number
//   order_number: string
//   user_id: number

//   user_email: string // أضف هذا
//   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
//   total_amount: string
//   shipping_cost: string | number
//   discount_amount: string | number
//   delivery_address: string
//   delivery_phone: string
//   delivery_name: string
//   notes?: string
//   created_at: string
//   updated_at: string
//   items: OrderItem[]
// }

// export interface OrderItem {
//   id: number
//   order_id: number
//   product_id: number
//   quantity: number
//   price: string | number
//   name: string
//   image_url: string
//   emoji_icon: string
//   created_at: string
// }

// // export interface Ad {
// //   id: number
// //   title: string
// //   description?: string
// //   image_url: string
// //   link_url?: string
// //   position: "homepage" | "sidebar" | "banner"
// //   is_active: boolean
// //   view_count: number
// //   click_count: number
// //   created_at: string
// // }

// export interface Ad {
//   id: number
//   title: string
//   title_ar: string
//   description: string
//   description_ar: string
//   image_url: string
//   start_date: string
//   end_date: string
//   position: "home_banner" | "category_banner" | "product_banner" | "sidebar"
//   priority: number
//   product_id?: number
//   product_name?: string
//   product_name_ar?: string
//   product_price?: string
//   is_active?: boolean
//   view_count?: number
//   click_count?: number
// }

// export interface CartItem {
//   product_id: number
//   quantity: number
//   product?: Product
// }

// export interface UserCart {
//   user_id: number
//   user_name: string
//   user_email?: string
//   user_phone: string
//   items: CartItem[]
//   total_items: number
//   total_value: number
// }

// export interface UserFavorite {
//   user_id: number
//   user_name: string
//   user_email?: string
//   user_phone: string
//   favorites: Product[]
//   total_favorites: number
// }

// export interface DashboardStats {
//   totalRevenue: number
//   totalOrders: number
//   totalProducts: number
//   totalUsers: number
//   revenueChange: number
//   ordersChange: number
//   productsChange: number
//   usersChange: number
// }

// export interface ProductsResponse {
//   products: Product[]
//   pagination: {
//     total: number
//     page: number
//     limit: number
//     totalPages: number
//   }
// }






// Updated all types to match actual backend API structure
export interface User {
  id: number
  name: string
  phone: string
  email?: string
  role: "user" | "admin"
  membershipLevel: "bronze" | "silver" | "gold" | "platinum"
  points: number
  totalOrders: number
  isVerified: boolean
  address?: {
    street: string
    city: string
    district: string
    postalCode: string
  }
  created_at?: string
}

export interface Product {
  id: number
  name: string
  name_ar: string
  brand: string
  price: string | number
  original_price: string | number
  sale_price?: string | number
  description: string
  description_ar: string
  category_id: number
  image_url: string
  emoji_icon: string
  rating: string | number
  reviews_count: number
  in_stock: boolean
  discount: number
  badge: string
  stock_quantity: number
  created_at: string
  updated_at: string
  category_name?: string
  category_name_ar?: string
}

export interface Category {
  id: number
  name: string
  name_ar: string
  icon: string
  color: string
  image_url: string
  product_count: string | number
  created_at: string
}

export interface Order {
  id: number
  order_number: string
  user_id: number
  user_name: string // Added user_name field from API response
  user_email: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: string
  shipping_cost: string | number
  discount_amount: string | number
  delivery_address: string
  delivery_phone: string
  delivery_name: string
  notes?: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: string | number
  name: string
  image_url: string
  emoji_icon: string
  created_at: string
}



export interface Ad {
  id: number
  title: string
  title_ar: string
  description: string
  description_ar: string
  image_url: string
  start_date: string
  end_date: string
  position: "home_banner" | "category_banner" | "product_banner" | "sidebar"
  priority: number
  product_id?: number
  product_name?: string
  product_name_ar?: string
  product_price?: string
  is_active?: boolean
  view_count?: number
  click_count?: number
}

export interface CartItem {
  product_id: number
  quantity: number
  product?: Product
}

export interface UserCart {
  user_id: number
  user_name: string
  user_email?: string
  user_phone: string
  items: CartItem[]
  total_items: number
  total_value: number
}

export interface UserFavorite {
  user_id: number
  user_name: string
  user_email?: string
  user_phone: string
  favorites: Product[]
  total_favorites: number
  
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChange: number
  ordersChange: number
  productsChange: number
  usersChange: number
}

export interface ProductsResponse {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
