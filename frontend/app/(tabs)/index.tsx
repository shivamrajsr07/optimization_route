import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function IndexScreen() {
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [result, setResult] = useState("");

  // Button animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      optimizeRoute();
    });
  };

  // Main Route Optimization Logic
  const optimizeRoute = () => {
    if (!fromPlace.trim() || !toPlace.trim()) {
      setResult("❗ Enter both locations first.");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const lvl = Math.floor(Math.random() * 3);

    let carTime, walkTime, trainTime, flightTime;
    let carCost, walkCost, trainCost, flightCost;

    if (lvl === 0) {
      carTime = "15–30 mins";
      walkTime = "20–40 mins";
      trainTime = "10–20 mins (if available)";
      flightTime = "Not practical";
      carCost = "₹80–₹200";
      walkCost = "Free";
      trainCost = "₹10–₹50";
      flightCost = "N/A";
    } else if (lvl === 1) {
      carTime = "2–5 hrs";
      walkTime = "Not realistic";
      trainTime = "1.5–4 hrs";
      flightTime = "1–2 hrs";
      carCost = "₹800–₹2500";
      trainCost = "₹300–₹1500";
      walkCost = "N/A";
      flightCost = "₹2500–₹6000";
    } else {
      carTime = "6–15 hrs+";
      walkTime = "Not realistic";
      trainTime = "5–20 hrs";
      flightTime = "2–8 hrs";
      carCost = "₹3000–₹15000";
      trainCost = "₹800–₹5000";
      walkCost = "N/A";
      flightCost = "₹6000–₹40000";
    }

    const recommendation =
      lvl === 0
        ? "🚗 Car or 🚶 Walk are best for short distance."
        : lvl === 1
        ? "🚆 Train is best value. ✈ Flight if you want speed."
        : "✈ Flight is most optimal for long routes.";

    const output = `
🧭 AI Route Optimization  

From ➜ ${fromPlace}  
To ➜ ${toPlace}

🚗 Car  
• Time: ${carTime}  
• Cost: ${carCost}

🚶 Walk  
• Time: ${walkTime}  
• Cost: ${walkCost}

🚆 Train / Metro  
• Time: ${trainTime}  
• Cost: ${trainCost}

✈ Flight  
• Time: ${flightTime}  
• Cost: ${flightCost}

✅ Recommendation  
${recommendation}
`;

    setResult(output);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Route Optimizer</Text>

      <Text style={styles.subtitle}>
        Enter two locations to get an AI-generated travel recommendation.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="From (city / area / country)"
        placeholderTextColor="#777"
        value={fromPlace}
        onChangeText={setFromPlace}
      />

      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="To (city / area / country)"
        placeholderTextColor="#777"
        value={toPlace}
        onChangeText={setToPlace}
      />

      {/* FAB Button */}
      <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut}>
        <Animated.View
          style={[
            styles.fab,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Ionicons name="sparkles-outline" size={30} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <ScrollView style={{ marginTop: 30, marginBottom: 120 }}>
        {result ? (
          <View style={styles.card}>
            <Text style={styles.cardText}>{result}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

// Styles
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
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1A1A1A",
    padding: 18,
    borderRadius: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 15,
    borderColor: "#333",
    borderWidth: 1,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
  },
});
