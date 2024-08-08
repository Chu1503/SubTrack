import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CustomPeriod = ({ value, onValueChange, unit, onUnitChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(unit || 'Day(s)');

  const unitOptions = [
    { label: 'Day(s)', value: 'Day(s)' },
    { label: 'Month(s)', value: 'Month(s)' },
    { label: 'Year(s)', value: 'Year(s)' },
  ];

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    onUnitChange(unit);
    setDropdownVisible(false);
  };

  const handleCloseModal = () => {
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Every</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onValueChange}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedUnit}</Text>
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={dropdownVisible}
          onRequestClose={handleCloseModal}
        >
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={unitOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelectUnit(item.value)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    width: 50,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    marginRight: 10,
  },
  dropdown: {
    width: 130,
    backgroundColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContent: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  option: {
    padding: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomPeriod;