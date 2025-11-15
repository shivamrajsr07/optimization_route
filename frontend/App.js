import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function App() {
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [optimized, setOptimized] = useState("");

  const scale = useRef(new Animated.Value(1)).current;

  const aiOptimizeRoute = () => {
    const from = fromPlace.trim();
    const to = toPlace.trim();

    if (!from || !to) {
      setOptimized("Please enter both locations first.");
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const distanceLevel = Math.floor(Math.random() * 3); // 0,1,2

    let carTime, walkTime, trainTime, flightTime;
    let carCost, walkCost, trainCost, flightCost;

    if (distanceLevel === 0) {
      carTime = "15–30 mins";
      walkTime = "25–40 mins";
      trainTime = "10–20 mins (if available)";
      flightTime = "Not practical";
      carCost = "₹80–₹200 (fuel / cab)";
      walkCost = "Free";
      trainCost = "₹10–₹50";
      flightCost = "N/A";
    } else if (distanceLevel === 1) {
      carTime = "2–5 hours";
      walkTime = "Not realistic";
      trainTime = "1.5–4 hours";
      flightTime = "1–2 hours (including check-in)";
      carCost = "₹800–₹2500";
      trainCost = "₹300–₹1500";
      walkCost = "N/A";
      flightCost = "₹2500–₹6000";
    } else {
      carTime = "6–15 hours+";
      walkTime = "Not realistic";
      trainTime = "5–20 hours (if route exists)";
      flightTime = "2–8 hours (air travel)";
      carCost = "₹3000–₹15000";
      trainCost = "₹800–₹5000";
      walkCost = "N/A";
      flightCost = "₹6000–₹40000";
    }

    const recommended =
      distanceLevel === 0
        ? "🚗 Car / 🚶 Walk are most practical.\nIf traffic is high, short metro/train is also good."
        : distanceLevel === 1
        ? "🚆 Train is usually the best balance of cost & time.\n✈ Flight is good if you value time more than cost."
        : "✈ Flight is the most optimal for long distance.\nUse 🚆 train if you want to reduce cost and time is flexible.";

    const response =
      `🧠 AI Route Optimization\n\n` +
      `From: ${from}\nTo: ${to}\n\n` +
      `🚗 Car:\n` +
      `• Estimated time: ${carTime}\n` +
      `• Approx cost: ${carCost}\n\n` +
      `🚶 Walk:\n` +
      `• Estimated time: ${walkTime}\n` +
      `• Approx cost: ${walkCost}\n\n` +
      `🚆 Train / Metro:\n` +
      `• Estimated time: ${trainTime}\n` +
      `• Approx cost: ${trainCost}\n\n` +
      `✈ Flight:\n` +
      `• Estimated time: ${flightTime}\n` +
      `• Approx cost: ${flightCost}\n\n` +
      `✅ Recommendation:\n` +
      recommended;

    setOptimized(response);
  };

  const animatePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      aiOptimizeRoute();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Route Optimizer</Text>

      <Text style={styles.subtitle}>
        Enter two locations and get an AI-style route summary with car, walk,
        train and flight options.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="From (city / area / country)"
        placeholderTextColor="#888"
        value={fromPlace}
        onChangeText={setFromPlace}
      />

      <TextInput
        style={[styles.input, { marginTop: 12 }]}
        placeholder="To (city / area / country)"
        placeholderTextColor="#888"
        value={toPlace}
        onChangeText={setToPlace}
      />

      <TouchableWithoutFeedback
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
      >
        <Animated.View style={[styles.fab, { transform: [{ scale }] }]}>
          <Ionicons name="navigate-outline" size={30} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <ScrollView style={{ marginTop: 30, marginBottom: 100 }}>
        {optimized ? (
          <View style={styles.card}>
            <Text style={styles.cardText}>{optimized}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 18,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  fab: {
    backgroundColor: "#6C63FF",
    width: 70,
    height: 70,
    borderRadius: 100,
    position: "absolute",
    bottom: 30,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderColor: "#333",
    borderWidth: 1,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
  },
});
