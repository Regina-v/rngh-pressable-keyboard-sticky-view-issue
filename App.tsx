import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import {
  KeyboardProvider,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const rippleConfig = {
  color: "#666666",
  borderless: true,
  foreground: true,
};

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <KeyboardProvider
          statusBarTranslucent={true}
          navigationBarTranslucent={true}
          preserveEdgeToEdge={true}
        >
          <AppContent />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function Snackbar({
  visible,
  setSnackbarVisible,
}: {
  visible?: boolean;
  setSnackbarVisible: (visible: boolean) => void;
}) {
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [visible, setSnackbarVisible]);

  return (
    <KeyboardStickyView offset={{ closed: -safeAreaInsets.bottom, opened: 0 }}>
      {visible && (
        <View style={[styles.snackbar]}>
          <Text style={styles.snackbarText}>Snackbar</Text>
        </View>
      )}
    </KeyboardStickyView>
  );
}

function Screen({
  setSnackbarVisible,
}: {
  setSnackbarVisible: (visible: boolean) => void;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleButtonPress = () => {
    setSnackbarVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}
    >
      <View style={styles.centerContent}>
        <Text style={styles.countText}>Count: {count}</Text>
        <Pressable
          style={styles.button}
          onPress={incrementCount}
          android_ripple={rippleConfig}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </Pressable>
      </View>

      <View style={styles.bottomContent}>
        <Pressable
          style={styles.button}
          onPress={handleButtonPress}
          android_ripple={rippleConfig}
        >
          <Text style={styles.buttonText}>Show snackbar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AppContent() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <>
      <Screen setSnackbarVisible={setSnackbarVisible} />
      <Snackbar
        visible={snackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  countText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  disabledButtonText: {
    color: "#666666",
  },
  snackbar: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 30,
    height: 50,
    backgroundColor: "#008000",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  snackbarText: {
    color: "white",
    fontSize: 14,
  },
});

export default App;
