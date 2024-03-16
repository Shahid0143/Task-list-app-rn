import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Tasklist() {
  const [task, setTask] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userinput, setUserinput] = useState("");

  const addTask = () => {
    if (userinput.trim() !== "") {
      const newTask = `Task ${task.length + 1}: ${userinput}`;
      setTask([...task, newTask]);
      setUserinput("");
      setModalVisible(false);
    }
  };

  const handleDelete = (i) => {
    const filteredData = task.filter((el, index) => index !== i);
    setTask(filteredData);
  };

  return (
    <View style={styles.box}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {task.map((el, i) => {
          return (
            <View key={i} style={styles.taskItem}>
              <Text style={{ color: "white" }}>{el}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <MaterialIcons name="assignment-add" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(0)} style={styles.button}>
          <MaterialIcons name="delete-sweep" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* //created model */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              onChangeText={(e) => setUserinput(e)}
              value={userinput}
            />
            <TouchableOpacity onPress={addTask} style={styles.addButton}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 40,
    paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.6)",
    backgroundColor: "rgba(128, 0, 128, 0.7)",
  },
  scrollView: {
    flexGrow: 1,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  card: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    marginBottom: -19,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
