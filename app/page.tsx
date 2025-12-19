"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  name_zh: string
  price: number
  category: string
  image: string
  description: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    name_zh: "宫保鸡丁",
    price: 68,
    category: "主菜",
    image: "/kung-pao-chicken.png",
    description: "经典川菜，鸡肉配花生米",
  },
  {
    id: 2,
    name: "Mapo Tofu",
    name_zh: "麻婆豆腐",
    price: 48,
    category: "主菜",
    image: "/mapo-tofu-dish.jpg",
    description: "麻辣豆腐，香气扑鼻",
  },
  {
    id: 3,
    name: "Sweet and Sour Pork",
    name_zh: "糖醋里脊",
    price: 58,
    category: "主菜",
    image: "/sweet-sour-pork.jpg",
    description: "酸甜可口，老少皆宜",
  },
  {
    id: 4,
    name: "Fried Rice",
    name_zh: "扬州炒饭",
    price: 38,
    category: "主食",
    image: "/yangzhou-fried-rice.jpg",
    description: "粒粒分明的炒饭",
  },
  {
    id: 5,
    name: "Hot and Sour Soup",
    name_zh: "酸辣汤",
    price: 28,
    category: "汤品",
    image: "/hot-sour-soup.jpg",
    description: "开胃暖心的汤品",
  },
  {
    id: 6,
    name: "Spring Rolls",
    name_zh: "春卷",
    price: 32,
    category: "小食",
    image: "/crispy-spring-rolls.jpg",
    description: "酥脆可口的春卷",
  },
  {
    id: 7,
    name: "Dumplings",
    name_zh: "水饺",
    price: 36,
    category: "小食",
    image: "/chinese-dumplings.jpg",
    description: "手工现包饺子",
  },
  {
    id: 8,
    name: "Steamed Fish",
    name_zh: "清蒸鲈鱼",
    price: 88,
    category: "主菜",
    image: "/steamed-fish-chinese.jpg",
    description: "新鲜鲈鱼清蒸",
  },
]

export default function RestaurantOrderApp() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("全部")
  const [showCart, setShowCart] = useState(false)

  const categories = ["全部", "主菜", "主食", "汤品", "小食"]

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prevCart.filter((cartItem) => cartItem.id !== id)
    })
  }

  const deleteFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredItems =
    selectedCategory === "全部" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">味道餐厅</h1>
              <p className="text-sm text-muted-foreground">正宗中餐，现点现做</p>
            </div>
            <Button onClick={() => setShowCart(!showCart)} className="relative" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              购物车
              {getTotalItems() > 0 && (
                <Badge className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-foreground">菜品分类</h2>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name_zh}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{item.category}</Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{item.name_zh}</h3>
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                      </div>
                      <span className="text-xl font-bold text-primary">¥{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <Button onClick={() => addToCart(item)} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      加入购物车
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Section - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 text-foreground">订单详情</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">购物车是空的</p>
                    <p className="text-sm text-muted-foreground mt-2">快来添加美味菜品吧！</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-4 border-b last:border-b-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name_zh}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate text-foreground">{item.name_zh}</h4>
                            <p className="text-sm text-primary font-bold">¥{item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addToCart(item)}
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteFromCart(item.id)}
                                className="h-7 w-7 p-0 ml-auto text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">小计</span>
                        <span className="font-medium">¥{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">服务费</span>
                        <span className="font-medium">¥5</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>总计</span>
                        <span className="text-primary">¥{getTotalPrice() + 5}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg">
                      结算订单
                    </Button>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Cart Modal */}
      {showCart && (
        <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-x-0 bottom-0 bg-card rounded-t-3xl shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-foreground">订单详情</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-12 flex-1">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">购物车是空的</p>
                <p className="text-sm text-muted-foreground mt-2">快来添加美味菜品吧！</p>
              </div>
            ) : (
              <>
                <div className="overflow-y-auto flex-1 p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name_zh}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate text-foreground">{item.name_zh}</h4>
                        <p className="text-sm text-primary font-bold">¥{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => addToCart(item)} className="h-7 w-7 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteFromCart(item.id)}
                            className="h-7 w-7 p-0 ml-auto text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t bg-card">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">小计</span>
                      <span className="font-medium">¥{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">服务费</span>
                      <span className="font-medium">¥5</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>总计</span>
                      <span className="text-primary">¥{getTotalPrice() + 5}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    结算订单
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
