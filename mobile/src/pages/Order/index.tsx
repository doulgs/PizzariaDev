import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

type RouteDetailParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  name: string;
};

export type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");

  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function loadInfo() {
      setLoading(true);
      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
      setLoading(false);
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,
        },
      });

      setProducts(response.data);
      setProductSelected(response.data[0]);
      setLoadingProducts(false);
    }

    loadProducts();
  }, [categorySelected]);

  async function handleCloseOrder() {
    try {
      setLoading(true);
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item);
  }

  async function handleAdd() {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    };

    setItems((oldArray) => [...oldArray, data]);
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete("/order/remove", {
      params: {
        item_id: item_id,
      },
    });

    let removeItem = items.filter((item) => {
      return item.id !== item_id;
    });

    setItems(removeItem);
  }

  function handleFinishOrder() {
    navigation.navigate("FinishOrder", {
      number: route.params?.number,
      order_id: route.params?.order_id,
    });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={75} color="#fbc02d" style={{ flex: 1 }} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Mesa {route.params.number}</Text>
            {items.length === 0 && (
              <TouchableOpacity onPress={handleCloseOrder}>
                <Feather name="trash-2" size={28} color="#ff3f4b" />
              </TouchableOpacity>
            )}
          </View>
          <View>
            {category.length !== 0 && (
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalCategoryVisible(true)}
              >
                <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.input}
              onPress={() => setModalProductVisible(true)}
              disabled={products.length === 0 ? true : false}
            >
              {loadingProducts ? (
                <ActivityIndicator size={24} color="#FFF" />
              ) : (
                <Text style={{ color: "#FFF" }}>
                  {products.length === 0
                    ? "Categoria sem produtos..."
                    : productSelected?.name}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.qtdContainer]}>
            <Text style={styles.qtdText}>Quantidade</Text>
            <TextInput
              style={[styles.input, { width: "60%", textAlign: "center" }]}
              placeholderTextColor="#f0f0f0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
              disabled={items.length === 0}
              onPress={handleFinishOrder}
            >
              <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 24 }}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem data={item} deleteItem={handleDeleteItem} />
            )}
          />

          <Modal
            transparent
            visible={modalCategoryVisible}
            animationType="fade"
            statusBarTranslucent
          >
            <ModalPicker
              title="Selecione a Categoria"
              handleCloseModal={() => setModalCategoryVisible(false)}
              options={category}
              selectedItem={handleChangeCategory}
            />
          </Modal>

          <Modal
            transparent
            visible={modalProductVisible}
            animationType="fade"
            statusBarTranslucent
          >
            <ModalPicker
              title="Selecione o Produto"
              handleCloseModal={() => setModalProductVisible(false)}
              options={products}
              selectedItem={handleChangeProduct}
            />
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 16,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#FFF",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd2ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
  button: {
    width: "75%",
    backgroundColor: "#2fffa3",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
